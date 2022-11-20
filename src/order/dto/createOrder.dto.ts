import { paymentMethod } from '@prisma/client';
import { IsIn, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class createOrderDto {
  // requiredDate:  dat
  
  @IsNotEmpty()
  @IsIn([
    paymentMethod.online,
    paymentMethod.offline
  ])
  paymentMethod: paymentMethod

  @IsNotEmpty()
  @IsString()
  province: string

  @IsNotEmpty()
  @IsString()
  district: string

  @IsNotEmpty()
  @IsString()
  ward   :  string

  @IsNotEmpty()
  @IsString()
  address : string

  @IsOptional()
  Note: string;
}

// model Order {
//     id        Int      @id @default(autoincrement())
//     createdAt DateTime @default(now())
//     updatedAt DateTime @updatedAt

//     requiredDate  DateTime
//     status        orderProcess
//     total         Int
//     paymentMethod paymentMethod
//     shipNumber    Int
//     shipDate      DateTime

//     user User @relation(fields: [UID], references: [id])
//     UID  Int

//     deliveryAddress String
//     Note            String

//     isActive     Boolean        @default(true)
//     Order_detail Order_detail[]
//   }
