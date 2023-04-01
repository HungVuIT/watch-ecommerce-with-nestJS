import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from 'src/prisma/prisma.service';
import { rateBody } from './rating.controller';

@Injectable()
export class RatingService {
    constructor(config: ConfigService, private prisma: PrismaService) {}

    async rateProduct(userID: number, body: rateBody) {
        try {
            await this.prisma.watch_rating.create({
                data: {
                    UID: userID,
                    WID: body.targetID,
                    score: body.score,
                    content: body.content,
                },
            });
        } catch (error) {
            throw error;
        }
    }

    async updateRateProduct(userID: number,  body: rateBody) {
        // try {
        //     await this.prisma.$queryRaw`
        //     update "Watch_rating"
        //     set "score" = ${score}
        //     where "UID" = ${userID} and "WID" = ${productID}
        //     `;
        // } catch (error) {
        //     throw error;
        // }
        try {
            await this.prisma.watch_rating.updateMany({
                where: {
                    UID: userID,
                    WID: body.targetID
                },
                data: {
                    score: body.score,
                    content: body.content
                },
            });
        } catch (error) {
            throw error;
        }
    }

    async rateShop(userID: number, body: rateBody) {
        try {
            await this.prisma.shop_rating.create({
                data: {
                    UID: userID,
                    SID: body.targetID,
                    score: body.score,
                    content: body.content,
                },
            });
        } catch (error) {
            throw error;
        }
    }

    async updateRateShop(userID: number,  body: rateBody) {
        try {
            await this.prisma.shop_rating.updateMany({
                where: {
                    UID: userID,
                    SID: body.targetID
                },
                data: {
                    score: body.score,
                    content: body.content
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

            const list = await this.prisma.shop_rating.findMany({
                where: {
                    SID: shopID
                },
                include: {
                    user: true
                }
            })

            return {score: score._avg.score, list: list}
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

            const list = await this.prisma.watch_rating.findMany({
                where: {
                    WID: watchID
                },
                include: {
                    user: true
                }
            })

            return {score: score._avg.score, list: list}
        } catch (error) {
            throw error;
        }
    }
}
