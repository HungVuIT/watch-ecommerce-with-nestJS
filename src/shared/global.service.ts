import { Injectable } from '@nestjs/common';

@Injectable()
export class globalVariables {
    public static deliveryLocation: {
        [index: string]: {
            province: string;
            district: string;
            ward: string;
            address: string;
            deliveryOption: number;
        };
    } = {};

    public static orderList: { [index: string]: any } = {};

    public static paymentHost: { [index: string]: string } = {};

    public static orderDetail: {
        [index: string]: {
            shipFee: number;
            itemValue: number;
            total: number;
        };
    } = {};

    public static other: { [index: string]: any } = {};

    deleteUserInfor(userId: number) {
        delete globalVariables.deliveryLocation[userId];
        delete globalVariables.orderList[userId];
        delete globalVariables.paymentHost[userId];
        delete globalVariables.orderDetail[userId];
        delete globalVariables.other[userId];
    }
}
