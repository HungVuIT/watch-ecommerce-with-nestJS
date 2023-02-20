import { IsEmail, IsNotEmpty, IsNumberString, IsOptional, IsString } from 'class-validator';

export class createShopDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    description: string;

    @IsString()
    @IsOptional()
    content: string;

    @IsNotEmpty()
    @IsString()
    province: string;

    @IsNotEmpty()
    @IsString()
    district: string;

    @IsNotEmpty()
    @IsString()
    ward: string;

    @IsNotEmpty()
    @IsString()
    address: string;

    @IsString()
    @IsEmail()
    @IsOptional()
    email: string;

    @IsNotEmpty()
    @IsNumberString()
    phoneNumber: string;

    @IsOptional()
    logo: string;

    @IsOptional()
    banner: string;
}

// model Shop {
//     id        Int      @id @default(autoincrement())
//     createdAt DateTime @default(now())
//     updatedAt DateTime @updatedAt

//     name String

//     description String?
//     content     String?

//     province String?
//     distric  String?
//     address  String?

//     email       String?
//     phoneNumber String?

//     logoUrl   String?
//     bannerUrl String?

//     user User @relation(fields: [UID], references: [id])
//     UID  Int  @unique

//     watchs Watch[]

//     isActive Boolean @default(true)
//   }
