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
exports.OrderService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const delivery_service_1 = require("../delivery/delivery.service");
const payment_service_1 = require("../payment/payment.service");
const prisma_service_1 = require("../prisma/prisma.service");
const global_service_1 = require("../shared/global.service");
let OrderService = class OrderService {
    constructor(prisma, payment, delivery, config, glo) {
        this.prisma = prisma;
        this.payment = payment;
        this.delivery = delivery;
        this.config = config;
        this.glo = glo;
    }
    async getOrdersUser(id) {
        try {
            return await this.prisma.order.findMany({
                where: { UID: id },
                orderBy: { createdAt: 'desc' },
                include: {
                    Order_detail: true,
                    shop: true
                }
            });
        }
        catch (error) {
            throw error;
        }
    }
    async getOrdersShop(id) {
        try {
            return await this.prisma.order.findMany({
                where: { SID: id },
                orderBy: { createdAt: 'desc' },
                include: {
                    Order_detail: true,
                    shop: true,
                    user: true
                }
            });
        }
        catch (error) {
            throw error;
        }
    }
    async getOrdersAdmin() {
        try {
            return await this.prisma.order.findMany({
                orderBy: { createdAt: 'desc' },
                include: {
                    Order_detail: true,
                    shop: true,
                    user: true
                }
            });
        }
        catch (error) {
            throw error;
        }
    }
    async getOrderDetail(orderId) {
        try {
            return await this.prisma.order_detail.findMany({
                where: { OID: orderId },
                include: {
                    product: true,
                    order: {
                        include: {
                            shop: true,
                            user: true,
                        },
                    },
                },
            });
        }
        catch (error) {
            throw error;
        }
    }
    async updateOrder(id, body) {
        try {
            await this.prisma.order.update({
                where: { id: id },
                data: {
                    status: body.status,
                },
            });
        }
        catch (error) {
            throw error;
        }
    }
    async deleteOrder(id) {
        try {
            await this.prisma.order.delete({
                where: { id: id },
            });
        }
        catch (error) {
            throw Error('cant delete');
        }
    }
    generateOrderCode() {
        const charSet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        var randomString = '';
        for (var i = 0; i < 8; i++) {
            var randomPoz = Math.floor(Math.random() * charSet.length);
            randomString += charSet.substring(randomPoz, randomPoz + 1);
        }
        return randomString;
    }
};
OrderService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        payment_service_1.PaymentService,
        delivery_service_1.DeliveryService,
        config_1.ConfigService,
        global_service_1.globalVariables])
], OrderService);
exports.OrderService = OrderService;
//# sourceMappingURL=order.service.js.map