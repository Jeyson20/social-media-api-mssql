import { BadRequestException, ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { MssqlService } from 'src/database/services';
import { BodyRegisterUserDto, BodyLoginUserDto, BodyRefreshTokenDto } from './dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { renameObjectKeys, Response } from 'src/common/utils';

@Injectable()
export class AuthService {
    constructor(
        readonly mssqlService: MssqlService,
        readonly jwtService: JwtService
    ) { }

    async register(params: BodyRegisterUserDto): Promise<Response<number>> {

        const user = await this.validateUser(params.email);
        if (user) throw new ConflictException('This user already exists')

        const pass = await this.encriptPassword(params.password);
        try {
            const conn = await this.mssqlService.getConnection();
            const result = (await conn.request()
                .input('firstName', params.firstName)
                .input('lastName', params.lastName)
                .input('email', params.email)
                .input('password', pass)
                .input('phoneNumber', params.phoneNumber)
                .input('isActive', params.isActive)
                .execute('SP_POST_USER')).recordset[0];

            return new Response<number>(true, null, result.data)

        } catch (ex) {
            throw new BadRequestException(ex.message);
        }

    }

    async login(params: BodyLoginUserDto): Promise<object> {

        const validateUser = await this.validateUser(params.email);
        if (!validateUser) throw new BadRequestException('Incorrect user or password');

        var user = renameObjectKeys(validateUser);

        const pass = await bcrypt.compare(params.password, user.password)
        if (!pass) throw new BadRequestException('Incorrect user or password');

        const payload = { id: user.userId, fullName: `${user.firstName} ${user.lastName}`, email: user.email };

        return await this.generateTokens(payload)

    }

    async refreshToken(params: BodyRefreshTokenDto): Promise<object> {

        try {

            const { id, fullName, email } = await this.jwtService.verify(params.refreshToken) as {
                id: number, fullName: string, email: string
            };

            const payload = { id, fullName, email }

            return await this.generateTokens(payload)
        } catch (error) {
            throw new UnauthorizedException(error.message)
        }
    }

    private async generateTokens(payload: object): Promise<object> {

        const [accessToken, refreshToken] = await Promise.all([
            this.jwtService.signAsync(payload, { expiresIn: '15m' }),
            this.jwtService.signAsync(payload, { expiresIn: '1h' }),
        ]);

        return {
            access_token: accessToken,
            refresh_token: refreshToken,
        };
    }

    private async encriptPassword(password: string): Promise<string> {
        const salt = await bcrypt.genSalt(10);
        return await bcrypt.hash(password, salt);
    }

    private async validateUser(email: string): Promise<any> {

        try {
            const conn = await this.mssqlService.getConnection();
            const user = (await conn.request()
                .input('email', email)
                .execute('SP_GET_VALIDATE_USER')).recordset[0];
            return user;
        } catch (ex) {
            throw new BadRequestException(ex.message)
        }

    }

}

