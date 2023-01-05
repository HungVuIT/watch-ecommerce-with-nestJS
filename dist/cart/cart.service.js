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
exports.CartService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let CartService = class CartService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getCart(userId) {
        try {
            const cart = await this.prisma.cart.findMany({
                where: { UID: userId },
                orderBy: {
                    createdAt: 'desc',
                },
            });
            return cart;
        }
        catch (error) {
            throw error;
        }
    }
    async deleteItem(cartId) {
        try {
            await this.prisma.cart.delete({
                where: {
                    id: cartId,
                },
            });
        }
        catch (error) {
            throw error;
        }
    }
    async addItem(userId, body) {
        try {
            await this.prisma.cart.create({
                data: {
                    UID: userId,
                    WID: body.itemId,
                    quantity: body.quantity || 1,
                },
            });
        }
        catch (error) {
            throw error;
        }
    }
    async updateItem(userId, body) {
        try {
            await this.prisma.cart.update({
                where: { id: body.cartId },
                data: { quantity: body.quantity },
            });
        }
        catch (error) {
            throw error;
        }
    }
};
CartService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CartService);
exports.CartService = CartService;
//# sourceMappingURL=cart.service.js.map