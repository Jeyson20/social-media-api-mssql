import { Controller, Get, Param, Query, Req } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Get()
    getUsers(): Promise<any> {
        return this.usersService.getUsers()
    }

    @Get(':id')
    getUserById(@Param('id') id: number): Promise<any> {
        return this.usersService.getUserById(id);
    }

    @Get('/userByEmail/:email')
    getUserByEmail(@Param("email") email: string): Promise<any> {
        return this.usersService.getUserByEmail(email);
    }

}
