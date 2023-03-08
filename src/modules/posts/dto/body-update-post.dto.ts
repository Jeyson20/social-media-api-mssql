import { IsNotEmpty, IsOptional } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class BodyUpdatePostDto {

    @ApiProperty()
    @IsNotEmpty()
    readonly description: string;

    @ApiProperty()
    @IsOptional()
    readonly image: string;
}