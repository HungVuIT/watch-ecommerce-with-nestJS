/// <reference types="multer" />
import { BrandService } from './brand.service';
import { createBrandDto } from './dto/createBrand.dto';
import { editBrandDto } from './dto/editBrand.dto';
export declare class BrandController {
    private service;
    constructor(service: BrandService);
    createBrand(body: createBrandDto, file: Express.Multer.File): Promise<import(".prisma/client").Brand>;
    editBrand(id: number, body: editBrandDto, file: Express.Multer.File): Promise<import("@nestjs/common").HttpException | import(".prisma/client").Brand>;
    getList(): Promise<import(".prisma/client").Brand[]>;
    getById(id: number): Promise<import(".prisma/client").Brand>;
    delete(id: number): Promise<import(".prisma/client").Brand>;
}
