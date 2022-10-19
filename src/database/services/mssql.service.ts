import {
    Injectable, Logger
} from '@nestjs/common';
import { ConfigService } from "@nestjs/config";
import sql from 'mssql';

@Injectable()
export class MssqlService {
    private readonly logger: Logger = new Logger(MssqlService.name);
    private readonly dbUser: any;
    private readonly dbPassword: any;
    private readonly dbServer: any;
    private readonly dba: any;

    constructor(configService: ConfigService) {
        this.dbUser = configService.get('DB_USERNAME');
        this.dbPassword = configService.get('DB_PASSWORD');
        this.dba = configService.get('DATABASE');
        this.dbServer = configService.get('SERVER');
    }

    async getConnection() {
        try {
            const pool = await sql.connect({
                user: this.dbUser,
                password: this.dbPassword,
                database: this.dba,
                server: this.dbServer,
                options: {
                    encrypt: true, // for azure
                    trustServerCertificate: true // change to true for local dev / self-signed certs
                }
            })
            // const result = await pool.query("SELECT TOP (1000) [UserId],[FirstName],[LastName],[Email],[PhoneNumber],[IsActive]FROM [SocialMedia].[dbo].[Users]");
            // console.log(result.recordset[0]);

            return pool;
        } catch (error) {
            this.logger.log(error)
        }
    };

    // async close() {
    //     await (await this.getConnection()).close();
    // }
}







