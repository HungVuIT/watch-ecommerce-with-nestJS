import { ConfigService } from '@nestjs/config';
export declare class PaymentService {
    private config;
    constructor(config: ConfigService);
    vndToUsd(vnd: number): number;
    checkoutLink(userId: number, listItem: {
        name: string;
        quantity: number;
        price: number;
    }[]): Promise<unknown>;
    succcessCheckout(userId: number): Promise<void>;
    payoutSeller(userId: number): Promise<void>;
    VNPayCheckoutUrl(): Promise<string>;
    sortObject(obj: any): {};
    VNPayReturn(req: any): {
        code: any;
    };
}
