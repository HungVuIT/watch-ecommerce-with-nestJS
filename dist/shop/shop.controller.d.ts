/// <reference types="multer" />
import { createShopDto } from './dto/createShop.dto';
import { ShopService } from './shop.service';
export declare class ShopController {
    private shopService;
    constructor(shopService: ShopService);
    createShop(id: number, body: createShopDto): Promise<import(".prisma/client").Shop | import("@nestjs/common").HttpException>;
    updateMyShop(id: number, body: any, files: {
        logo?: Express.Multer.File[];
        banner?: Express.Multer.File[];
    }): Promise<import(".prisma/client").Shop | import("@nestjs/common").HttpException>;
    updateShop(id: number, body: any, files: {
        logo?: Express.Multer.File[];
        banner?: Express.Multer.File[];
    }): Promise<import(".prisma/client").Shop | import("@nestjs/common").HttpException>;
    deleteShop(id: number): Promise<import("@nestjs/common").HttpException>;
    listShop(query: any): Promise<import("@nestjs/common").HttpException | import(".prisma/client").Shop[]>;
    getShopById(id: number): import(".prisma/client").Prisma.Prisma__ShopClient<import(".prisma/client").Shop, never> | import("@nestjs/common").HttpException;
    myShop(shop: any): any;
    addPayment(id: number, body: any): Promise<import("@nestjs/common").HttpException | import(".prisma/client").ShopWallet>;
    dashbroad(id: number, body: any): Promise<import("@nestjs/common").HttpException | {
        orderCount: number;
        soldCount: import(".prisma/client").Prisma.GetOrder_detailAggregateType<{
            where: {
                order: {
                    shop: {
                        id: number;
                    };
                };
            };
            _sum: {
                quantity: true;
            };
        }>;
        revenue: import(".prisma/client").Prisma.GetOrderAggregateType<{
            where: {
                shop: {
                    id: number;
                };
            };
            _sum: {
                total: true;
            };
        }>;
        watchCount: import(".prisma/client").Prisma.GetWatchAggregateType<{
            where: {
                shop: {
                    id: number;
                };
            };
            _count: true;
            _sum: {
                quantity: true;
            };
        }>;
        bestSellingProduct: import(".prisma/client").Watch;
    }>;
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
        watchCount: number;
    }>;
}
