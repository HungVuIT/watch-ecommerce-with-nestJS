import { Request } from 'express';
import { globalVariables } from 'src/shared/global.service';
import { createOrderDto } from './dto/createOrder.dto';
import { OrderService } from './order.service';
export declare class OrderController {
    private orderService;
    private glo;
    constructor(orderService: OrderService, glo: globalVariables);
    createOrder(id: number, body: createOrderDto, req: Request): Promise<void | {
        href: unknown;
    }>;
    success(id: number, req: Request): Promise<import("./order.service").OrderByShop[]>;
    getOrderList(id: number): Promise<import(".prisma/client").Order[]>;
    getOrderDetail(id: number): Promise<import(".prisma/client").Order_detail[]>;
    updateOrder(id: number, body: any): Promise<void>;
    deleteOrder(id: number): Promise<void>;
    getShipFee(id: number, body: createOrderDto): Promise<number>;
}
