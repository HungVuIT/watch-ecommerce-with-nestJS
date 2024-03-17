import { Gender } from '@prisma/client';
import { Type } from 'class-transformer';
import { IsArray, IsBoolean, IsIn, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class createProductDto {
    @IsNotEmpty()
    @IsString()
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

    @IsNotEmpty()
    @Type(() => Number)
    @IsOptional()
    isHome: number;

    @IsOptional()
    image: any;
}

// model Product {
//     id        Int      @id @default(autoincrement())
//     createdAt DateTime @default(now())
//     updatedAt DateTime @updatedAt

//     name String

//     BID Int?

//     shop Shop @relation(fields: [SID], references: [id])
//     SID  Int

//     CID Int?

//     sku            String?
//     description    String?
//     content        String?
//     isHome         Boolean @default(true)
//     saled          Int     @default(0)
//     price          Int?
//     estimatedPrice Int?

//     image String[] @default(["https://res.cloudinary.com/vhh/image/upload/v1665845768/product-ecommerce/76007_vyvril.png"])

//     isActive Boolean @default(true)

//     Favorite     Favorite[]
//     Cart         Cart[]
//     Order_detail Order_detail[]
//     Comment      Comment[]
//     Product_rating Product_rating[]
//     sale_off     Sale_off?
//   }
