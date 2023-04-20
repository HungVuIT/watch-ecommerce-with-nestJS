import { PrismaService } from 'src/prisma/prisma.service';
import { createSaleOffDto } from './dto/createSaleOff.dto';
import { editSaleOffDto } from './dto/editSaleOff.dto';
export declare class SaleOffService {
    private prisma;
    constructor(prisma: PrismaService);
    editSaleOff(body: editSaleOffDto): Promise<import(".prisma/client").Sale_off>;
    createSaleOff(body: createSaleOffDto): Promise<import(".prisma/client").Sale_off>;
}
