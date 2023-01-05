import { HttpException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { createBrandDto } from './dto/createBrand.dto';
import { editBrandDto } from './dto/editBrand.dto';
export declare class BrandService {
    private prisma;
    constructor(prisma: PrismaService);
    getById(BrandId: number): Promise<import(".prisma/client").Category>;
    getList(): Promise<import(".prisma/client").Category[]>;
    editBrand(categoryId: number, body: editBrandDto, file: any): Promise<HttpException | import(".prisma/client").Category>;
    createBrand(body: createBrandDto, file: any): Promise<import(".prisma/client").Category>;
}
