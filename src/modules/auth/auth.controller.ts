import { Body, Controller, Post, Request, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { BodySignupUserDto } from './dto';

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


}