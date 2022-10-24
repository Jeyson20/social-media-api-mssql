import { BadRequestException, Injectable } from '@nestjs/common';
import { MssqlService } from 'src/database/services';

@Injectable()
export class PostsService {
        constructor(private readonly mssqlService: MssqlService) { }

    async getPosts() {

        const pool = await this.mssqlService.getConnection();

        try {
            const result = (await pool.query('SELECT * FROM POSTS')).recordset;

            // const response = {
            //   statusCode: 200,
            //   message: 
            // }
            return {
                code: 200,
                message: 'OK',
                data: result
            }

        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }

}
