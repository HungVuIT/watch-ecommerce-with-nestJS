/// <reference types="multer" />
import { createShopDto } from './dto/createShop.dto';
import { ShopService } from './shop.service';
export declare class ShopController {
    private shopService;
    constructor(shopService: ShopService);
    createShop(id: number, body: createShopDto): Promise<(import("@prisma/client/runtime").GetResult<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        description: string;
        content: string;
        province: string;
        district: string;
        ward: string;
        address: string;
        email: string;
        phoneNumber: string;
        logo: string;
        banner: string;
        UID: number;
        isActive: boolean;
    }, unknown, never> & {}) | import("@nestjs/common").HttpException>;
    updateMyShop(id: number, body: any, files: {
        logo?: Express.Multer.File[];
        banner?: Express.Multer.File[];
    }): Promise<(import("@prisma/client/runtime").GetResult<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        description: string;
        content: string;
        province: string;
        district: string;
        ward: string;
        address: string;
        email: string;
        phoneNumber: string;
        logo: string;
        banner: string;
        UID: number;
        isActive: boolean;
    }, unknown, never> & {}) | import("@nestjs/common").HttpException>;
    updateShop(id: number, body: any, files: {
        logo?: Express.Multer.File[];
        banner?: Express.Multer.File[];
    }): Promise<(import("@prisma/client/runtime").GetResult<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        description: string;
        content: string;
        province: string;
        district: string;
        ward: string;
        address: string;
        email: string;
        phoneNumber: string;
        logo: string;
        banner: string;
        UID: number;
        isActive: boolean;
    }, unknown, never> & {}) | import("@nestjs/common").HttpException>;
    deleteShop(id: number): Promise<import("@nestjs/common").HttpException>;
    listShop(query: any): Promise<import("@nestjs/common").HttpException | (import("@prisma/client/runtime").GetResult<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        description: string;
        content: string;
        province: string;
        district: string;
        ward: string;
        address: string;
        email: string;
        phoneNumber: string;
        logo: string;
        banner: string;
        UID: number;
        isActive: boolean;
    }, unknown, never> & {})[]>;
    getShopById(id: number): import(".prisma/client").Prisma.Prisma__ShopClient<import("@prisma/client/runtime").GetResult<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        description: string;
        content: string;
        province: string;
        district: string;
        ward: string;
        address: string;
        email: string;
        phoneNumber: string;
        logo: string;
        banner: string;
        UID: number;
        isActive: boolean;
    }, unknown, never> & {}, never, import("@prisma/client/runtime").DefaultArgs> | import("@nestjs/common").HttpException;
    myShop(shop: any): any;
    dashbroadAdmin(): Promise<import("@nestjs/common").HttpException | {
        orderCount: number;
        soldCount: import(".prisma/client").Prisma.GetOrder_detailAggregateType<{
            _sum: {
                quantity: true;
            };
        }>;
        revenue: import(".prisma/client").Prisma.GetOrderAggregateType<{
            _sum: {
                total: true;
            };
        }>;
        productCount: number;
    }>;
}
