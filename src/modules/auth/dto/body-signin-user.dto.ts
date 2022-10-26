import { IsString } from "class-validator";

export class BodySigninUserDto {

    @IsString()
    readonly email: string;

    @IsString()
    readonly password: string;
}