import { HttpException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { createBrandDto } from './dto/createBrand.dto';
import { editBrandDto } from './dto/editBrand.dto';
export declare class BrandService {
    private prisma;
    constructor(prisma: PrismaService);
    getById(BrandId: number): Promise<import("@prisma/client/runtime").GetResult<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        description: string;
        image: string;
    }, unknown, never> & {}>;
    getList(): Promise<(import("@prisma/client/runtime").GetResult<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        description: string;
        image: string;
    }, unknown, never> & {})[]>;
    editBrand(brandId: number, body: editBrandDto, file: any): Promise<HttpException | (import("@prisma/client/runtime").GetResult<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        description: string;
        image: string;
    }, unknown, never> & {})>;
    createBrand(body: createBrandDto, file: any): Promise<import("@prisma/client/runtime").GetResult<{
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
