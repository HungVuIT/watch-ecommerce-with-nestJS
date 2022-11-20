import { IsNotEmpty, IsOptional } from "class-validator";

export class createCategoryDto {
    @IsNotEmpty()
    name: string

    @IsOptional()
    description: string

    @IsOptional()
    image: any
}