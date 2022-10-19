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
    await this.oracleService.getConnection();
    this.logger.log('MsSql connection established! :D');
  }
}
