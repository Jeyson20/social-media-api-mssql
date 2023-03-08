import { Controller, Get, HttpCode, HttpStatus, Param, Query, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt/jwt.auth.guard';
import { UsersService } from './users.service';

@ApiTags('Users')
@ApiBearerAuth()
@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Get()
    @HttpCode(HttpStatus.OK)
    getUsers(): Promise<any> {
        return this.usersService.getUsers()
    }

    @Get(':id')
    @HttpCode(HttpStatus.OK)
    getUserById(@Param('id') id: number): Promise<any> {
        return this.usersService.getUserById(id);
    }

    @Get('/email/:email')
    @HttpCode(HttpStatus.OK)
    getUserByEmail(@Param("email") email: string): Promise<any> {
        return this.usersService.getUserByEmail(email);
    }

}
