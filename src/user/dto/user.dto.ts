import { Type } from 'class-transformer';
import {
  IsDate,
  IsEmail,
  IsISO8601,
  IsNumberString,
  IsOptional,
  IsString,
} from 'class-validator';
export class userDto {
  @IsEmail()
  @IsOptional()
  email: string;

  @IsOptional()
  @IsNumberString()
  phoneNumber: string;

  @IsString()
  @IsOptional()
  firstName: string;

  @IsString()
  @IsOptional()
  lastName: string;

  @IsString()
  @IsOptional()
  province: string;

  @IsString()
  @IsOptional()
  district: string;

  @IsString()
  @IsOptional()
  ward: string;

  @IsString()
  @IsOptional()
  address: string;

  @Type(() => Date)
  @IsOptional()
  birthDay: Date;

  @IsOptional()
  avatar: string;
}

// model User {
//     id        Int      @id @default(autoincrement())
//     createdAt DateTime @default(now())
//     updatedAt DateTime @updatedAt

//     username String @unique
//     password String

//     email       String? @unique
//     phoneNumber String?

//     firstName String?
//     lastName  String?

//     province String?
//     district String?
//     address  String?
//     birthDay DateTime?

//     avatar String?
//     status Boolean?

//     role Role @default(USER)

//     shop     Shop?
//     Favorite Favorite[]
//     Cart     Cart[]

//     isActive Boolean @default(true)
//   }
