import { paymentMethod } from '@prisma/client';
export declare class createOrderDto {
    paymentMethod: paymentMethod;
    province: string;
    district: string;
    ward: string;
    address: string;
    Note: string;
    deliveryOption: number;
}
