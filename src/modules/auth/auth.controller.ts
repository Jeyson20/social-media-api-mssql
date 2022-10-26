import { Body, Controller, HttpCode, Post, Request, UsePipes, ValidationPipe, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { BodySigninUserDto, BodySignupUserDto } from './dto';

@Controller('auth')
@UsePipes(new ValidationPipe({ skipMissingProperties: true }))
@UsePipes(new ValidationPipe({ forbidNonWhitelisted: true, whitelist: true, transform: true }))

export class AuthController {
    constructor(readonly authService: AuthService) { }

    @Post('/signup')

    async signup(@Body() params: BodySignupUserDto) {
        const data = await this.authService.signup(params);
        return data;
    }

    @Post('/signin')
    @HttpCode(HttpStatus.OK)
    async signin(@Body() params: BodySigninUserDto) {

        const data = await this.authService.signin(params);
        return data;
    }

}