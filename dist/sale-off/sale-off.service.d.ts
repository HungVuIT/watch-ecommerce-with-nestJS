import { PrismaService } from 'src/prisma/prisma.service';
import { createSaleOffDto } from './dto/createSaleOff.dto';
import { editSaleOffDto } from './dto/editSaleOff.dto';
export declare class SaleOffService {
    private prisma;
    constructor(prisma: PrismaService);
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
