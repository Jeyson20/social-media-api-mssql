import { Body, Controller, HttpCode, Post, Request, UsePipes, ValidationPipe, HttpStatus } from '@nestjs/common';
import {ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { BodyLoginUserDto, BodyRegisterUserDto } from './dto';
import { BodyRefreshTokenDto } from './dto/body-refresh-token.dto';

@ApiTags('Auth')
@Controller('auth')
// @UsePipes(new ValidationPipe({ skipMissingProperties: true }))
// @UsePipes(new ValidationPipe({ forbidNonWhitelisted: true, whitelist: true, transform: true }))

export class AuthController {
    constructor(readonly authService: AuthService) { }

    @Post('/register')
    @HttpCode(HttpStatus.CREATED)
    async signup(@Body() params: BodyRegisterUserDto) {
        return await this.authService.register(params);
    }

    @Post('/login')
    @HttpCode(HttpStatus.OK)
    async signin(@Body() params: BodyLoginUserDto) {
        return await this.authService.login(params);
    }
    
    @Post('/refresh-token')
    @HttpCode(HttpStatus.OK)
    async refreshToken(@Body() params: BodyRefreshTokenDto): Promise<object> {
        return await this.authService.refreshToken(params);
    }
}