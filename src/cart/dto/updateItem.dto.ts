import { Type } from "class-transformer";
import { IsInt, IsNotEmpty, IsOptional } from "class-validator";

export class updateItemDto {
    
    @IsNotEmpty()
    @Type(()=>Number)
    @IsInt()
    cartId: number

    @IsNotEmpty()
    @Type(()=>Number)
    @IsInt()
    quantity: number
}