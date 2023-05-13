import { Gender } from '@prisma/client';
import { Type } from 'class-transformer';
import { IsArray, IsBoolean, IsIn, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class updateWatchDto {
    @IsOptional()
    @IsString()
    name: string;

    @IsNumber()
    @Type(() => Number)
    @IsInt()
    @IsOptional()
    BID: number;

    @IsArray()
    @Type(() => Number)
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
    @Type(() => Number)
    height: number;

    @IsOptional()
    @Type(() => Number)
    length: number;

    @IsOptional()
    @Type(() => Number)
    width: number;

    @IsOptional()
    madeBy: string;

    @IsOptional()
    @IsString()
    warranty: string;

    @IsOptional()
    image: any;

    @IsOptional()
    @IsNotEmpty()
    @Type(() => Boolean)
    @IsBoolean()
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
