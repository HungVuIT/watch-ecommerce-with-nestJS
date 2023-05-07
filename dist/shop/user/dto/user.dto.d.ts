import { Gender } from '@prisma/client';
export declare class userDto {
    email: string;
    phoneNumber: string;
    firstName: string;
    lastName: string;
    province: string;
    district: string;
    ward: string;
    address: string;
    gender: Gender;
    birthDay: Date;
    avatar: string;
}
