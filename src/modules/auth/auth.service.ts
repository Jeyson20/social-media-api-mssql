import { Injectable } from '@nestjs/common';
import { MssqlService } from 'src/database/services';

@Injectable()
export class AuthService {
    constructor(readonly mssqlService: MssqlService) { }

}
