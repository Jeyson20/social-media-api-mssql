import { BadRequestException, Injectable } from '@nestjs/common';
import { MssqlService } from 'src/database/services';
import { BodySignupUserDto } from './dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(readonly mssqlService: MssqlService) { }


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

}
