import { Request } from 'express';
import { createOrderDto } from './dto/createOrder.dto';
import { OrderService } from './order.service';
export declare class OrderController {
    private orderService;
    constructor(orderService: OrderService);
    createOrder(id: number, body: createOrderDto, req: Request): Promise<import(".prisma/client").Order | {
        href: unknown;
        total: number;
        shipFee: number;
    }>;
    success(id: number, req: Request): Promise<import(".prisma/client").Order>;
    getOrderList(id: number): Promise<import(".prisma/client").Order[]>;
    getOrderDetail(id: number): Promise<import(".prisma/client").Order_detail[]>;
}
