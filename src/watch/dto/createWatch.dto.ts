import { Gender } from '@prisma/client';
import { Type } from 'class-transformer';
import { IsArray, IsBoolean, IsIn, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class createWatchDto {
    @IsNotEmpty()
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

    @IsNotEmpty()
    @Type(() => Number)
    @IsInt()
    quantity: number;

    @IsNotEmpty()
    @Type(() => Number)
    @IsInt()
    price: number;

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
    image: any;

    @IsOptional()
    @IsString()
    warranty: string;
    
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
