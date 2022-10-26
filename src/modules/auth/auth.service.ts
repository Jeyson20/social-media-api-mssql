import { BadRequestException, Injectable } from '@nestjs/common';
import { MssqlService } from 'src/database/services';
import { BodySigninUserDto, BodySignupUserDto } from './dto';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
    constructor(
        readonly mssqlService: MssqlService,
        readonly usersService: UsersService
    ) { }

    async signin(params: BodySigninUserDto) {

        const user = await this.validateUser(params.email);
        if (!user) throw new BadRequestException('Incorrect user or password');

        const pass = await bcrypt.compare(params.password, user.Password)
        if (!pass) throw new BadRequestException('Incorrect user or password');

        const data = {
            response: {
                code: 200,
                description: "OK"
            },
            userData: {
                firstName: user.FirstName,
                lastName: user.LastName,
                email: user.Email,
            }
        }
        return data
    }

    async signup(params: BodySignupUserDto) {

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
                .execute('SP_POST_USER')).recordset;

            return result;

        } catch (ex) {
            throw new BadRequestException(ex.message);
        }

    }


    async encriptPassword(password: string): Promise<string> {
        const salt = await bcrypt.genSalt(10);
        return await bcrypt.hash(password, salt);
    }



    // async validatePassword(email: string, pass: ): Promise<string> {

    //     const user = await this.usersService.getUserByEmail(email);
    //     if (user && user.password === pass) {
    //         const { password, ...result } = user;
    //         return result;
    //     }
    //     return null;
    // }

    async validateUser(email: string): Promise<any> {

        const conn = await this.mssqlService.getConnection();
        const user = (await conn.request()
            .input('email', email)
            .execute('SP_GET_VALIDATE_USER')).recordset[0];
        return user;
    }

}
