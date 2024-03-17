import { Gender } from '@prisma/client';
import { Type } from 'class-transformer';
import { IsArray, IsBoolean, IsIn, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class updateProductDto {
    @IsNotEmpty()
    @IsString()
    @IsOptional()
    name: string;

    @IsNumber()
    @Type(() => Number)
    @IsInt()
    @IsOptional()
    BID: number;

    @IsNumber()
    @Type(() => Number)
    @IsInt()
    @IsOptional()
    CID: number;

    @IsOptional()
    sku: string;

    @IsOptional()
    @IsString()
    description: string;

    @IsOptional()
    @IsString()
    content: string;

    @Type(() => Number)
    @IsInt()
    quantity: number;

    @Type(() => Number)
    @IsOptional()
    @IsInt()
    price: number;

    @Type(() => Number)
    @IsOptional()
    @IsInt()
    estimatedPrice: number;

    @Type(() => Number)
    @IsOptional()
    isHome: number;

    @IsOptional()
    image: any;
}
