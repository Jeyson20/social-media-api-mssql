import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class BodyCreatePostDto{

    @ApiProperty()
    @IsNotEmpty()
    readonly description: string;

    @ApiProperty()
    @IsNotEmpty()
    readonly userId: number;

    @ApiProperty()
    @IsOptional()
    readonly image: string;
}