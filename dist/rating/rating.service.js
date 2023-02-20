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
    async rateProduct(userID, productID, score) {
        try {
            await this.prisma.watch_rating.create({
                data: {
                    UID: userID,
                    WID: productID,
                    score: score,
                },
            });
        }
        catch (error) {
            throw error;
        }
    }
    async updateRateProduct(userID, productID, score) {
        try {
            await this.prisma.$queryRaw `
            update "Watch_rating"
            set "score" = ${score}
            where "UID" = ${userID} and "WID" = ${productID}
            `;
        }
        catch (error) {
            throw error;
        }
    }
    async rateShop(userID, shopID, score) {
        try {
            await this.prisma.shop_rating.create({
                data: {
                    UID: userID,
                    SID: shopID,
                    score: score,
                },
            });
        }
        catch (error) {
            throw error;
        }
    }
    async updateRateShop(userID, shopID, score) {
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
        }
        catch (error) {
            throw error;
        }
    }
    async getProdcutRate(watchID) {
        try {
            await this.prisma.watch_rating.aggregate({
                _avg: {
                    score: true,
                },
                where: {
                    WID: watchID,
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
            return score._avg.score;
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
            return score._avg.score;
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