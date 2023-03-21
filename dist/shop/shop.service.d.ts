/// <reference types="multer" />
import { HttpException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { createShopDto } from './dto/createShop.dto';
export declare class ShopService {
    private prisma;
    constructor(prisma: PrismaService);
    findById(shopId: number): import(".prisma/client").Prisma.Prisma__ShopClient<import(".prisma/client").Shop, never> | HttpException;
    findMany(option: any): Promise<HttpException | import(".prisma/client").Shop[]>;
    deleteByUserId(userId: number): Promise<HttpException>;
    updateByUserId(id: number, body: createShopDto, files: {
        logo?: Express.Multer.File[];
        banner?: Express.Multer.File[];
    }): Promise<import(".prisma/client").Shop | HttpException>;
    create(userId: number, body: createShopDto): Promise<import(".prisma/client").Shop | HttpException>;
    addPayment(shopId: number, email: string): Promise<HttpException | import(".prisma/client").ShopWallet>;
}
