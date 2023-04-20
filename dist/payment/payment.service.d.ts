import { ConfigService } from '@nestjs/config';
import { PrismaService } from 'src/prisma/prisma.service';
export declare class PaymentService {
    private config;
    private prisma;
    constructor(config: ConfigService, prisma: PrismaService);
    vndToUsd(vnd: number): number;
    checkoutLink(userId: number): Promise<unknown>;
    succcessCheckout(userId: number): Promise<void>;
    payoutSeller(orderId: number): Promise<boolean>;
    VNPayCheckoutUrl(): Promise<string>;
    sortObject(obj: any): {};
    VNPayReturn(req: any): {
        code: any;
    };
}
