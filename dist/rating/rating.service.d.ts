import { ConfigService } from '@nestjs/config';
import { PrismaService } from 'src/prisma/prisma.service';
export declare class RatingService {
    private prisma;
    constructor(config: ConfigService, prisma: PrismaService);
    rateProduct(userID: number, productID: number, score: number): Promise<void>;
    updateRateProduct(userID: number, productID: number, score: number): Promise<void>;
    rateShop(userID: number, shopID: number, score: number): Promise<void>;
    updateRateShop(userID: number, shopID: number, score: number): Promise<void>;
    getShopRate(shopID: number): Promise<number>;
    getProductRate(watchID: number): Promise<number>;
}
