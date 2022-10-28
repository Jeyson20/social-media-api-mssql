import { BadRequestException, Injectable } from '@nestjs/common';
import { MssqlService } from 'src/database/services';

@Injectable()
export class UsersService {
    constructor(private readonly mssqlService: MssqlService) { }

    async getUsers(): Promise<any> {

        try {

            const conn = await this.mssqlService.getConnection();
            const result = (await conn.request().execute('SP_GET_USERS')).recordsets;

            return {
                response: result[1][0],
                data: result[0],
            }

        } catch (ex) {
            throw new BadRequestException(ex.message)
        }
    }

    async getUserById(id: Number): Promise<any> {

        try {

            const conn = await this.mssqlService.getConnection();
            const result = (await conn.request()
                .input('UserId', id)
                .execute('SP_GET_USER')).recordsets;

            return {
                response: result[1][0],
                data: result[0],
            }

        } catch (ex) {
            throw new BadRequestException(ex.message)
        }
    }

    async getUserByEmail(email: string): Promise<any> {

        try {
            const conn = await this.mssqlService.getConnection();
            const result = (await conn.request()
                .input('email', email)
                .execute('SP_GET_USER_BY_EMAIL')).recordsets;

            return {
                response: result[1][0],
                data: result[0],
            }

        } catch (ex) {
            throw new BadRequestException(ex.message)
        }
    }

    async validateUser(email: string): Promise<any> {

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
