import { IsNotEmpty, IsOptional } from "class-validator";

export class createBrandDto {
    @IsNotEmpty()
    name: string

    @IsOptional()
    description: string

    @IsOptional()
    image: any
}