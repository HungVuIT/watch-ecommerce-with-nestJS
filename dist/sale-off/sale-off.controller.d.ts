import { SaleOffService } from './sale-off.service';
import { createSaleOffDto } from './dto/createSaleOff.dto';
import { editSaleOffDto } from './dto/editSaleOff.dto';
export declare class SaleOffController {
    private service;
    constructor(service: SaleOffService);
    createSaleOff(body: createSaleOffDto): Promise<import("@prisma/client/runtime").GetResult<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        amount: number;
        quantity: number;
        start: Date;
        end: Date;
        PID: number;
    }, unknown, never> & {}>;
    editSaleOff(body: editSaleOffDto): Promise<import("@prisma/client/runtime").GetResult<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        amount: number;
        quantity: number;
        start: Date;
        end: Date;
        PID: number;
    }, unknown, never> & {}>;
    delete(id: number): Promise<import("@prisma/client/runtime").GetResult<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        amount: number;
        quantity: number;
        start: Date;
        end: Date;
        PID: number;
    }, unknown, never> & {}>;
}
