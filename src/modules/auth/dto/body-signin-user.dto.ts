import { IsNotEmpty } from "class-validator";

export class BodySigninUserDto {

    @IsNotEmpty()
    readonly email: string;

    @IsNotEmpty()
    readonly password: string;
}