import { Controller, Get, Param, Query, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt/jwt.auth.guard';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Get()
    @UseGuards(JwtAuthGuard)
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
