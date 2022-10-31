import { IsEmail, IsNumberString, IsOptional, IsString, IsUrl } from "class-validator";

export class shopDto{

    @IsString()
    @IsOptional()
    name: string;

    @IsString()
    @IsOptional()
    description: string;

    @IsString()
    @IsOptional()
    content :    string;
  
    @IsString()
    @IsOptional()
    province: string

    @IsString()
    @IsOptional()
    district: string

    @IsString()
    @IsOptional()
    ward: string

    @IsString()
    @IsOptional()
    address :string;
  
    @IsString()
    @IsEmail()
    @IsOptional()
    email     :  string;

    @IsNumberString()
    @IsOptional()
    phoneNumber: string;
  
    @IsOptional()
    logo  : string;

    @IsOptional()
    banner : string;
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