import {IsNotEmpty, IsOptional } from 'class-validator';

export class BodySignupUserDto {

    @IsNotEmpty()
    readonly firstName: string;

    @IsNotEmpty()
    readonly lastName: string;

    @IsNotEmpty()
    readonly email: string;

    @IsNotEmpty()
    readonly password: string;

    @IsOptional()
    readonly phoneNumber: string;

    @IsOptional()
    readonly isActive: boolean;
}