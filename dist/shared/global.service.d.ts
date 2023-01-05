export declare class globalVariables {
    static deliveryLocation: {
        [index: string]: {
            province: string;
            district: string;
            ward: string;
            address: string;
            deliveryOption: number;
        };
    };
    static cartList: {
        [index: string]: any;
    };
    static paymentHost: {
        [index: string]: string;
    };
    static orderDetail: {
        [index: string]: {
            shipFee: number;
            itemValue: number;
            total: number;
        };
    };
    static other: {
        [index: string]: any;
    };
    deleteUserInfor(userId: number): void;
}
