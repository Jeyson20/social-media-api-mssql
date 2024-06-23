import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class BodyLoginUserDto {

    @ApiProperty()
    @IsNotEmpty()
    readonly email: string;

    @ApiProperty()
    @IsNotEmpty()
    readonly password: string;
}
export class AuthTokenDto {
    accessToken: string;
    refreshToken: string;
  }