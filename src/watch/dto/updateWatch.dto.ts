import { Gender } from '@prisma/client';
import { Type } from 'class-transformer';
import { IsArray, IsIn, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class updateWatchDto {
    @IsOptional()
    @IsString()
    name: string;

    @IsNumber()
    @IsOptional()
    BID: number;

    @IsArray()
    @IsOptional()
    CID: number[];

    @IsOptional()
    sku: string;

    @IsOptional()
    @IsString()
    description: string;

    @IsOptional()
    @IsString()
    content: string;

    @IsOptional()
    @IsNotEmpty()
    @Type(() => Number)
    @IsInt()
    quantity: number;

    @IsOptional()
    @IsNotEmpty()
    @Type(() => Number)
    @IsInt()
    price: number;

    @IsOptional()
    @IsNotEmpty()
    @Type(() => Number)
    @IsInt()
    priceFloor: number;

    @IsOptional()
    @IsString()
    @IsIn([Gender.female, Gender.male, Gender.none])
    gender: Gender;

    @IsOptional()
    @IsString()
    materialCord: string;

    @IsOptional()
    @IsString()
    glassSurface: string;

    @IsOptional()
    @IsString()
    glassSize: string;

    @IsOptional()
    @Type(() => Number)
    weight: number;

    @IsOptional()
    madeBy: string;

    @IsOptional()
    image: any;

    @IsOptional()
    isOld: boolean;

    @IsOptional()
    @IsString()
    status: string;

    @IsOptional()
    @IsString()
    include: string;

    @IsOptional()
    @IsString()
    used: string;

    @IsOptional()
    @IsString()
    resalePrice: number;

    // @IsOptional()
    // warranty     : date
}
