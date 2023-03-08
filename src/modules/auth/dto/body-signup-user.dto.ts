import { ApiProperty } from '@nestjs/swagger';
import {IsNotEmpty, IsOptional } from 'class-validator';

export class BodySignupUserDto {

    @ApiProperty()
    @IsNotEmpty()
    readonly firstName: string;

    @ApiProperty()
    @IsNotEmpty()
    readonly lastName: string;

    @ApiProperty()
    @IsNotEmpty()
    readonly email: string;

    @ApiProperty()
    @IsNotEmpty()
    readonly password: string;

    @ApiProperty()
    @IsOptional()
    readonly phoneNumber: string;
    
    @IsOptional()
    readonly isActive: boolean;
}