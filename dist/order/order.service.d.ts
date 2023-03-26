import { ConfigService } from '@nestjs/config';
import { DeliveryService } from 'src/delivery/delivery.service';
import { PaymentService } from 'src/payment/payment.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { globalVariables } from 'src/shared/global.service';
export declare class OrderService {
    private prisma;
    private payment;
    private delivery;
    private config;
    private glo;
    constructor(prisma: PrismaService, payment: PaymentService, delivery: DeliveryService, config: ConfigService, glo: globalVariables);
    createLinkPaymant(userId: number): Promise<{
        href: unknown;
        total: number;
        shipFee: number;
    }>;
    completeOrder(userId: number): Promise<import(".prisma/client").Order>;
    cashOnDelivery(userId: number): Promise<import(".prisma/client").Order>;
    getOrders(userId: number): Promise<import(".prisma/client").Order[]>;
    getOrderDetail(orderId: number): Promise<import(".prisma/client").Order_detail[]>;
}
