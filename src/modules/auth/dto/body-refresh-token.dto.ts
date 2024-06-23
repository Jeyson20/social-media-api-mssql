import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class BodyRefreshTokenDto {

    @ApiProperty()
    @IsNotEmpty({ message: 'El refresh token es requerido' })
    readonly refreshToken: string;
}