import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class BodyCreatePostDto{

    @IsNotEmpty()
    readonly description: string;

    @IsNotEmpty()
    readonly userId: number;

    @IsOptional()
    readonly image: string;
}