import { SaleOffService } from './sale-off.service';
import { createSaleOffDto } from './dto/createSaleOff.dto';
import { editSaleOffDto } from './dto/editSaleOff.dto';
export declare class SaleOffController {
    private service;
    constructor(service: SaleOffService);
    createSaleOff(body: createSaleOffDto): Promise<import(".prisma/client").Sale_off>;
    editSaleOff(body: editSaleOffDto): Promise<import(".prisma/client").Sale_off>;
}
