import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class BodySignupUserDto {

    @IsString()
    readonly firstName: string;

    @IsString()
    readonly lastName: string;

    @IsString()
    readonly email: string;

    @IsString()
    readonly password: string;

    @IsString()
    @IsOptional()
    readonly phoneNumber: string;

    @IsBoolean()
    @IsOptional()
    readonly isActive: boolean;
}