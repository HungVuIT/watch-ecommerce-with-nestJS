import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from 'src/prisma/prisma.service';
import { rateBody } from './rating.controller';
import { Exception } from 'handlebars';

@Injectable()
export class RatingService {
    constructor(config: ConfigService, private prisma: PrismaService) {}

    async rateProduct(userID: number, body: rateBody) {
        try {
            // const orders = await this.prisma.order.findMany({
            //     where: {UID: userID},
            //     include: {Order_detail: true}
            // })

            // const WIDs = orders
            // .flatMap((order) => order.Order_detail)
            // .map((order_detail) => order_detail.PID);

            // if (!WIDs.includes(body.targetID)) return { message: 'server conflict', success: false }
            await this.prisma.product_rating.create({
                data: {
                    UID: userID,
                    PID: body.targetID,
                    score: body.score,
                    content: body.content,
                },
            });
        } catch (error) {
            throw error
        }
    }

    async updateRateProduct(userID: number,  body: rateBody) {
        // try {
        //     await this.prisma.$queryRaw`
        //     update "Watch_rating"
        //     set "score" = ${score}
        //     where "UID" = ${userID} and "PID" = ${productID}
        //     `;
        // } catch (error) {
        //     throw error;
        // }
        try {
            await this.prisma.product_rating.updateMany({
                where: {
                    UID: userID,
                    PID: body.targetID
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

    async getProductRate(productID: number) {
        try {
            const score = await this.prisma.product_rating.aggregate({
                _avg: {
                    score: true,
                },
                where: {
                    PID: productID,
                },
            });

            const list = await this.prisma.product_rating.findMany({
                where: {
                    PID: productID
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
