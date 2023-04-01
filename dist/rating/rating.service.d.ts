import { ConfigService } from '@nestjs/config';
import { PrismaService } from 'src/prisma/prisma.service';
import { rateBody } from './rating.controller';
export declare class RatingService {
    private prisma;
    constructor(config: ConfigService, prisma: PrismaService);
    rateProduct(userID: number, body: rateBody): Promise<void>;
    updateRateProduct(userID: number, body: rateBody): Promise<void>;
    rateShop(userID: number, body: rateBody): Promise<void>;
    updateRateShop(userID: number, body: rateBody): Promise<void>;
    getShopRate(shopID: number): Promise<{
        score: number;
        list: (import(".prisma/client").Shop_rating & {
            user: import(".prisma/client").User;
        })[];
    }>;
    getProductRate(watchID: number): Promise<{
        score: number;
        list: (import(".prisma/client").Watch_rating & {
            user: import(".prisma/client").User;
        })[];
    }>;
}
