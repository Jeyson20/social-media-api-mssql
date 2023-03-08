import { Body, Controller, HttpCode, Post, Request, UsePipes, ValidationPipe, HttpStatus } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { BodySigninUserDto, BodySignupUserDto } from './dto';

@ApiTags('Auth')
@Controller('auth')
// @UsePipes(new ValidationPipe({ skipMissingProperties: true }))
// @UsePipes(new ValidationPipe({ forbidNonWhitelisted: true, whitelist: true, transform: true }))

export class AuthController {
    constructor(readonly authService: AuthService) { }

    @Post('/signup')
    @HttpCode(HttpStatus.CREATED)
    async signup(@Body() params: BodySignupUserDto) {
        return await this.authService.signup(params);
    }

    @Post('/signin')
    @HttpCode(HttpStatus.OK)
    async signin(@Body() params: BodySigninUserDto) {
        return await this.authService.signin(params);
    }

}