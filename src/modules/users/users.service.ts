import { BadRequestException, Injectable } from '@nestjs/common';
import { MssqlService } from 'src/database/services';

@Injectable()
export class UsersService {
    constructor(private readonly mssqlService: MssqlService) { }

    async getUsers(): Promise<any> {

        try {

            const conn = await this.mssqlService.getConnection();
            const result = (await conn.request().execute('SP_GET_USERS')).recordsets;

            const data = {
                response: result[1][0],
                data: result[0],
            }

            return data;

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

            const data = {
                response: result[1][0],
                data: result[0],
            }

            return data;

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
                
            const data = {
                response: result[1][0],
                data: result[0],
            }

            return data;

        } catch (ex) {
            throw new BadRequestException(ex.message)
        }
    }
}
