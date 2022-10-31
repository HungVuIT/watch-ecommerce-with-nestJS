import { Gender } from "@prisma/client"
import { Type } from "class-transformer"
import { IsArray, IsEnum, IsIn, IsInt, IsNotEmpty, IsNumber, IsNumberString, IsOptional, IsString } from "class-validator"
import { Interface } from "readline"

export class createWatchDto{

    @IsNotEmpty()
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
  
    @IsNotEmpty()
    @Type(() => Number)
    @IsInt()
    quantity   : number
    
    @IsNotEmpty()
    @Type(() => Number)
    @IsInt()
    price      : number

    @IsNotEmpty()
    @Type(() => Number)
    @IsInt()
    priceFloor : number
  
    @IsOptional()
    @IsString()
    @IsIn(["Male", "Female", "None"])
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

// model Watch {
//     id        Int      @id @default(autoincrement())
//     createdAt DateTime @default(now())
//     updatedAt DateTime @updatedAt
  
//     BID Int?
  
//     shop Shop @relation(fields: [SID], references: [id])
//     SID  Int
  
//     CID Int?
  
//     sku         String?
//     description String?
//     content     String?
  
//     quantity   Int
//     saled      Int @default(0)
//     price      Int
//     priceFloor Int
  
//     gender       String?
//     materialCord String?
//     glassSurface String?
//     glassSize    String?
//     weight       String?
//     madeBy       String?
//     image        String[]
//     warranty     DateTime?
  
//     Favorite Favorite[]
//     Cart     Cart[]
  
//     isActive Boolean @default(true)
//   }
  