import { IsNotEmpty, IsOptional } from "class-validator";

export class BodyUpdatePostDto {

    @IsNotEmpty()
    readonly description: string;

    @IsOptional()
    readonly image: string;
}