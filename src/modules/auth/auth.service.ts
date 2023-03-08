import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import { MssqlService } from 'src/database/services';
import { BodySigninUserDto, BodySignupUserDto } from './dto';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { renameObjectKeys, Response } from 'src/common/utils';

@Injectable()
export class AuthService {
    constructor(
        readonly mssqlService: MssqlService,
        readonly usersService: UsersService,
        readonly jwtService: JwtService
    ) { }

    async signin(params: BodySigninUserDto) {

        const validateUser = await this.usersService.validateUser(params.email);
        if (!validateUser) throw new BadRequestException('Incorrect user or password');

        var user = renameObjectKeys(validateUser);

        const pass = await bcrypt.compare(params.password, user.password)
        if (!pass) throw new BadRequestException('Incorrect user or password');

        const payload = { id: user.id, fullName: `${user.firstName} ${user.lastName}`, email: user.email };
        const token = this.jwtService.sign(payload);

        return {
            user,
            token
        }
    }

    async signup(params: BodySignupUserDto) {

        const user = await this.usersService.validateUser(params.email);
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

    private async encriptPassword(password: string): Promise<string> {
        const salt = await bcrypt.genSalt(10);
        return await bcrypt.hash(password, salt);
    }

}

