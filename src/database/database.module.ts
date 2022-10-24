import { Global, Logger, Module, OnModuleInit } from '@nestjs/common';

import { MssqlService } from './services';

@Global()
@Module({
  providers: [MssqlService],
  exports: [MssqlService],
})
export class DatabaseModule implements OnModuleInit {
  private readonly logger: Logger = new Logger(DatabaseModule.name);
  constructor(private readonly oracleService: MssqlService) {}

  async onModuleInit() {
    const pool = await this.oracleService.getConnection();

    if (pool.connected) {
      this.logger.log('Mssql connection established! :D');
    }

    // const result = await pool.request().query('SELECT * FROM Users');
    // console.log(result.recordset);
  }
}
