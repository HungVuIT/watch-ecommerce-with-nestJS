import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class RatingService {
    constructor(config: ConfigService, private prisma: PrismaService) {}

    async rateProduct(userID: number, productID: number, score: number) {
        try {
            await this.prisma.watch_rating.create({
                data: {
                    UID: userID,
                    WID: productID,
                    score: score,
                },
            });
        } catch (error) {
            throw error;
        }
    }

    async updateRateProduct(userID: number, productID: number, score: number) {
        try {
            await this.prisma.$queryRaw`
            update "Watch_rating"
            set "score" = ${score}
            where "UID" = ${userID} and "WID" = ${productID}
            `;
        } catch (error) {
            throw error;
        }
    }

    async rateShop(userID: number, shopID: number, score: number) {
        try {
            await this.prisma.shop_rating.create({
                data: {
                    UID: userID,
                    SID: shopID,
                    score: score,
                },
            });
        } catch (error) {
            throw error;
        }
    }

    async updateRateShop(userID: number, shopID: number, score: number) {
        try {
            await this.prisma.shop_rating.updateMany({
                where: {
                    UID: userID,
                    SID: shopID,
                },
                data: {
                    score: score,
                },
            });
        } catch (error) {
            throw error;
        }
    }

    async getProdcutRate(watchID: number) {
        try {
            await this.prisma.watch_rating.aggregate({
                _avg: {
                    score: true,
                },
                where: {
                    WID: watchID,
                },
            });
        } catch (error) {
            throw error;
        }
    }

    async getShopRate(shopID: number) {
        try {
            const score = await this.prisma.shop_rating.aggregate({
                _avg: {
                    score: true,
                },
                where: {
                    SID: shopID,
                },
            });

            return score._avg.score;
        } catch (error) {
            throw error;
        }
    }

    async getProductRate(watchID: number) {
        try {
            const score = await this.prisma.watch_rating.aggregate({
                _avg: {
                    score: true,
                },
                where: {
                    WID: watchID,
                },
            });

            return score._avg.score;
        } catch (error) {
            throw error;
        }
    }
}
