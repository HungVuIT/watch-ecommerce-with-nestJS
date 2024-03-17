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
exports.FavoriteService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let FavoriteService = class FavoriteService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getList(userId) {
        try {
            const favorite = await this.prisma.favorite.findMany({
                where: { UID: userId },
                include: {
                    product: true,
                },
                orderBy: {
                    createdAt: 'desc',
                },
            });
            return favorite;
        }
        catch (error) {
            throw error;
        }
    }
    async deleteItem(favoriteId) {
        try {
            await this.prisma.favorite.delete({
                where: {
                    id: favoriteId,
                },
            });
        }
        catch (error) {
            throw error;
        }
    }
    async addItem(userId, body) {
        try {
            const favorite = await this.prisma.favorite.findFirst({
                where: {
                    UID: userId,
                    PID: body.itemId,
                },
            });
            if (!favorite) {
                return await this.prisma.favorite.create({
                    data: {
                        UID: userId,
                        PID: body.itemId
                    },
                });
            }
        }
        catch (error) {
            throw error;
        }
    }
};
FavoriteService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], FavoriteService);
exports.FavoriteService = FavoriteService;
//# sourceMappingURL=favorite.service.js.map