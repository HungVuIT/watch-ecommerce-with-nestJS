import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class RatingService {
    constructor(config: ConfigService, private prisma: PrismaService){}

    rateProduct(userID: number, productID: number, score:number){
        try {
            this.prisma.watch_rating.create({
                data:{
                    UID: userID,
                    WID: productID,
                    score: score
                }
            })
        } catch (error) {
            throw error
        }
        
    }

    updateRateProduct(userID: number, productID: number, score:number){
        try {
            this.prisma.watch_rating.updateMany({
                where:{
                    UID: userID,
                    WID: productID,
                },
                data:{
                    score: score
                }
            })
        } catch (error) {
            throw error
        }
        
    }

    rateShop(userID: number, shopID: number, score:number){
        try {
            this.prisma.shop_rating.create({
                data:{
                    UID: userID,
                    SID: shopID,
                    score: score
                }
            })
        } catch (error) {
            throw error
        }
        
    }

    updateRateShop(userID: number, shopID: number, score:number){
        try {
            this.prisma.shop_rating.updateMany({
                where:{
                    UID: userID,
                    SID: shopID,
                },
                data:{
                    score: score
                }
            })
        } catch (error) {
            throw error
        }
        
    }

    async getProdcutRate(watchID: number){
        try {
            return this.prisma.watch_rating.aggregate({
                _avg: {
                    score: true
                },
                where: {
                    WID: watchID
                }
            })
        } catch (error) {
            throw error
        }
    }

    async getShopRate(shopID: number){
        try {
            const score = await this.prisma.shop_rating.aggregate({
                _avg: {
                    score: true
                },
                where: {
                    SID: shopID
                }
            });

            return Math.round(score._avg.score);
        } catch (error) {
            throw error
        }
    }

    async getProductRate(watchID: number){
        try {
            const score = await this.prisma.watch_rating.aggregate({
                _avg: {
                    score: true
                },
                where: {
                    WID: watchID
                }
            });

            return Math.round(score._avg.score);
        } catch (error) {
            throw error
        }
    }
}
