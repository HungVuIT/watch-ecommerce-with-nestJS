/// <reference types="multer" />
import { BrandService } from './brand.service';
import { createBrandDto } from './dto/createBrand.dto';
import { editBrandDto } from './dto/editBrand.dto';
export declare class BrandController {
    private service;
    constructor(service: BrandService);
    createBrand(body: createBrandDto, file: Express.Multer.File): Promise<import("@prisma/client/runtime").GetResult<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        description: string;
        image: string;
    }, unknown, never> & {}>;
    editBrand(id: number, body: editBrandDto, file: Express.Multer.File): Promise<import("@nestjs/common").HttpException | (import("@prisma/client/runtime").GetResult<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        description: string;
        image: string;
    }, unknown, never> & {})>;
    getList(): Promise<(import("@prisma/client/runtime").GetResult<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        description: string;
        image: string;
    }, unknown, never> & {})[]>;
    getById(id: number): Promise<import("@prisma/client/runtime").GetResult<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        description: string;
        image: string;
    }, unknown, never> & {}>;
    delete(id: number): Promise<import("@prisma/client/runtime").GetResult<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        description: string;
        image: string;
    }, unknown, never> & {}>;
}
