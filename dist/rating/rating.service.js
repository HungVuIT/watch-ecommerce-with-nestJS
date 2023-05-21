"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RatingService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const prisma_service_1 = require("../prisma/prisma.service");
let RatingService = class RatingService {
    constructor(config, prisma) {
        this.prisma = prisma;
    }
    async rateProduct(userID, body) {
        try {
            const orders = await this.prisma.order.findMany({
                where: { UID: userID },
                include: { Order_detail: true }
            });
            const WIDs = orders
                .flatMap((order) => order.Order_detail)
                .map((order_detail) => order_detail.WID);
            if (!WIDs.includes(body.targetID))
                throw new Error();
            await this.prisma.watch_rating.create({
                data: {
                    UID: userID,
                    WID: body.targetID,
                    score: body.score,
                    content: body.content,
                },
            });
        }
        catch (error) {
            throw error;
        }
    }
    async updateRateProduct(userID, body) {
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
        }
        catch (error) {
            throw error;
        }
    }
    async rateShop(userID, body) {
        try {
            await this.prisma.shop_rating.create({
                data: {
                    UID: userID,
                    SID: body.targetID,
                    score: body.score,
                    content: body.content,
                },
            });
        }
        catch (error) {
            throw error;
        }
    }
    async updateRateShop(userID, body) {
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
        }
        catch (error) {
            throw error;
        }
    }
    async getShopRate(shopID) {
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
            });
            return { score: score._avg.score, list: list };
        }
        catch (error) {
            throw error;
        }
    }
    async getProductRate(watchID) {
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
            });
            return { score: score._avg.score, list: list };
        }
        catch (error) {
            throw error;
        }
    }
};
RatingService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService, prisma_service_1.PrismaService])
], RatingService);
exports.RatingService = RatingService;
//# sourceMappingURL=rating.service.js.map