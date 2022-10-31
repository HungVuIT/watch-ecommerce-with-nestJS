import { Gender } from "@prisma/client"
import { Type } from "class-transformer"
import { IsArray, IsInt, IsNotEmpty, IsNumber, IsNumberString, IsOptional, IsString } from "class-validator"
import { Interface } from "readline"

export class updateWatchDto{

    @IsOptional()
    @IsString()
    name: string

    @IsNumber()
    @IsOptional()
    BID: number
  
    @IsArray()
    @IsOptional()
    CID : number[]
  
    @IsOptional()
    sku        : string

    @IsOptional()
    @IsString()
    description  : string

    @IsOptional()
    @IsString()
    content    : string
  
    @IsOptional()
    @IsNotEmpty()
    @Type(() => Number)
    @IsInt()
    quantity   : number
    
    @IsOptional()
    @IsNotEmpty()
    @Type(() => Number)
    @IsInt()
    price      : number

    @IsOptional()
    @IsNotEmpty()
    @Type(() => Number)
    @IsInt()
    priceFloor : number
  
    @IsOptional()
    @IsString()
    gender      : Gender

    @IsOptional()
    @IsString()
    materialCord  : string

    @IsOptional()
    @IsString()
    glassSurface  : string

    @IsOptional()
    @IsString()
    glassSize    : string

    @IsOptional()
    @Type(() => Number)
    weight      : number

    @IsOptional()
    madeBy      : string

    @IsOptional()
    image: any

    // @IsOptional()
    // warranty     : date
}