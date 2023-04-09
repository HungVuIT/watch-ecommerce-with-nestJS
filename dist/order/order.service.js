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
const client_1 = require("@prisma/client");
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
    async createLinkPaymant(userId) {
        try {
            const listItem = await this.prisma.$queryRaw `
          SELECT "Cart"."id", 
          "Cart"."quantity", 
          "Cart"."WID", 
          "Cart"."UID", 
          "Watch"."name", 
          "Watch"."price", 
          "Watch"."SID",
          "Watch"."quantity" as "watchQuantity", 
          "ShopWallet"."paypalMethod"
          FROM "Cart" 
          LEFT JOIN "Watch" ON "Cart"."WID" = "Watch"."id"
          LEFT JOIN "Shop" ON "Watch"."SID" = "Shop"."id"
          LEFT JOIN "ShopWallet" On "Shop"."id" = "ShopWallet"."SID"
        `;
            if (listItem.length === 0)
                throw new common_1.HttpException('Cart is emty', common_1.HttpStatus.BAD_REQUEST);
            global_service_1.globalVariables.cartList[userId] = listItem;
            let total = 0;
            let quantiry = 0;
            listItem.forEach((item) => {
                if (item.quantity > item.watchQuantity)
                    throw new common_1.HttpException({
                        message: 'out of stock',
                        itemID: item.WID,
                        itemName: item.name,
                    }, common_1.HttpStatus.NOT_FOUND);
            });
            listItem.forEach((v) => {
                total += v.quantity * v.price;
                quantiry += v.quantity;
            });
            const listItemInPaypal = listItem.map((item) => ({
                name: item.name,
                quantity: item.quantity,
                price: item.price,
            }));
            const location = global_service_1.globalVariables.deliveryLocation[userId];
            let shipFee = await this.delivery.diliveryFee({
                toProvince: location.province,
                toDistrict: location.district,
                toWard: location.district,
                value: total,
                quantity: quantiry,
            });
            switch (global_service_1.globalVariables.deliveryLocation[userId].deliveryOption) {
                case 1:
                    shipFee = Math.round(shipFee * 1.1);
                    break;
                case 2:
                    break;
                case 3:
                    shipFee = Math.round(shipFee * 0.8);
                    break;
            }
            global_service_1.globalVariables.orderDetail[userId] = {
                shipFee: shipFee,
                itemValue: total,
                total: shipFee + total,
            };
            const result = {
                href: await this.payment.checkoutLink(userId, listItemInPaypal),
                total: total,
                shipFee: shipFee,
            };
            return result;
        }
        catch (error) {
            throw error;
        }
    }
    async completeOrder(userId) {
        try {
            await this.payment.succcessCheckout(userId);
            await this.payment.payoutSeller(userId);
            return await this.prisma.$transaction(async (tx) => {
                const { total } = global_service_1.globalVariables.orderDetail[userId];
                const order = await tx.order.create({
                    data: {
                        UID: userId,
                        total: total,
                        paymentMethod: 'online',
                    },
                });
                let data = [];
                const listItem = global_service_1.globalVariables.cartList[userId];
                listItem.forEach((v) => data.push({
                    OID: order.id,
                    WID: v.WID,
                    quantity: v.quantity,
                    total: v.price * v.quantity,
                    fee: v.price * v.quantity * Number(this.config.get('FEE')),
                }));
                await tx.order_detail.createMany({
                    data: data,
                });
                const update = listItem.map((item) => {
                    tx.watch.update({
                        where: { id: item.WID },
                        data: {
                            quantity: { increment: -item.quantity },
                            saled: { increment: item.quantity },
                        },
                    });
                });
                await Promise.all(update);
                let deliveryType = client_1.deliveryOption.standard;
                switch (global_service_1.globalVariables.deliveryLocation[userId].deliveryOption) {
                    case 1:
                        deliveryType = client_1.deliveryOption.express;
                        break;
                    case 2:
                        deliveryType = client_1.deliveryOption.standard;
                        break;
                    case 3:
                        deliveryType = client_1.deliveryOption.saving;
                        break;
                }
                await tx.delivery_detail.create({
                    data: Object.assign(Object.assign({}, global_service_1.globalVariables.deliveryLocation[userId]), { OID: order.id, shipFee: global_service_1.globalVariables.orderDetail[userId].shipFee, deliveryOption: deliveryType }),
                });
                await tx.cart.deleteMany({
                    where: { UID: userId },
                });
                this.glo.deleteUserInfor(userId);
                return order;
            });
        }
        catch (error) {
            throw error;
        }
    }
    async cashOnDelivery(userId) {
        try {
            const listItem = await this.prisma.$queryRaw `
          SELECT "Cart"."id", 
          "Cart"."quantity", 
          "Cart"."WID", 
          "Cart"."UID", 
          "Watch"."name", 
          "Watch"."price", 
          "Watch"."SID",
          "Watch"."quantity" as "watchQuantity", 
          "ShopWallet"."paypalMethod"
          FROM "Cart" 
          LEFT JOIN "Watch" ON "Cart"."WID" = "Watch"."id"
          LEFT JOIN "Shop" ON "Watch"."SID" = "Shop"."id"
          LEFT JOIN "ShopWallet" On "Shop"."id" = "ShopWallet"."SID"
        `;
            if (listItem.length === 0)
                throw new common_1.HttpException('Cart is emty', common_1.HttpStatus.BAD_REQUEST);
            global_service_1.globalVariables.cartList[userId] = listItem;
            let total = 0;
            let quantiry = 0;
            listItem.forEach((item) => {
                if (item.quantity > item.watchQuantity)
                    throw new common_1.HttpException({
                        message: 'out of stock',
                        itemID: item.WID,
                        itemName: item.name,
                    }, common_1.HttpStatus.NOT_FOUND);
            });
            listItem.forEach((v) => {
                total += v.quantity * v.price;
                quantiry += v.quantity;
            });
            const listItemInPaypal = listItem.map((item) => ({
                name: item.name,
                quantity: item.quantity,
                price: item.price,
            }));
            const location = global_service_1.globalVariables.deliveryLocation[userId];
            let shipFee = await this.delivery.diliveryFee({
                toProvince: location.province,
                toDistrict: location.district,
                toWard: location.district,
                value: total,
                quantity: quantiry,
            });
            switch (global_service_1.globalVariables.deliveryLocation[userId].deliveryOption) {
                case 1:
                    shipFee = Math.round(shipFee * 1.1);
                    break;
                case 2:
                    break;
                case 3:
                    shipFee = Math.round(shipFee * 0.8);
                    break;
            }
            global_service_1.globalVariables.orderDetail[userId] = {
                shipFee: shipFee,
                itemValue: total,
                total: shipFee + total,
            };
            return await this.prisma.$transaction(async (tx) => {
                const { total } = global_service_1.globalVariables.orderDetail[userId];
                const order = await tx.order.create({
                    data: {
                        UID: userId,
                        total: total,
                        paymentMethod: 'offline',
                    },
                });
                let data = [];
                const listItem = global_service_1.globalVariables.cartList[userId];
                listItem.forEach((v) => data.push({
                    OID: order.id,
                    WID: v.WID,
                    quantity: v.quantity,
                    total: v.price * v.quantity,
                    fee: v.price * v.quantity * Number(this.config.get('FEE')),
                }));
                await tx.order_detail.createMany({
                    data: data,
                });
                const update = listItem.map((item) => {
                    tx.watch.update({
                        where: { id: item.WID },
                        data: {
                            quantity: { increment: -item.quantity },
                            saled: { increment: item.quantity },
                        },
                    });
                });
                await Promise.all(update);
                let deliveryType = client_1.deliveryOption.standard;
                switch (global_service_1.globalVariables.deliveryLocation[userId].deliveryOption) {
                    case 1:
                        deliveryType = client_1.deliveryOption.express;
                        break;
                    case 2:
                        deliveryType = client_1.deliveryOption.standard;
                        break;
                    case 3:
                        deliveryType = client_1.deliveryOption.saving;
                        break;
                }
                await tx.delivery_detail.create({
                    data: Object.assign(Object.assign({}, global_service_1.globalVariables.deliveryLocation[userId]), { OID: order.id, shipFee: global_service_1.globalVariables.orderDetail[userId].shipFee, deliveryOption: deliveryType }),
                });
                await tx.cart.deleteMany({
                    where: { UID: userId },
                });
                this.glo.deleteUserInfor(userId);
                return order;
            });
        }
        catch (error) {
            throw error;
        }
    }
    async getOrders(userId) {
        try {
            return await this.prisma.order.findMany({
                where: { UID: userId },
                orderBy: { createdAt: 'desc' },
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
            });
        }
        catch (error) {
            throw error;
        }
    }
    async getDeliveryFree(userId) {
        try {
            const listItem = await this.prisma.$queryRaw `
          SELECT "Cart"."id", 
          "Cart"."quantity", 
          "Cart"."WID", 
          "Cart"."UID", 
          "Watch"."name", 
          "Watch"."price", 
          "Watch"."SID",
          "Watch"."quantity" as "watchQuantity", 
          "ShopWallet"."paypalMethod"
          FROM "Cart" 
          LEFT JOIN "Watch" ON "Cart"."WID" = "Watch"."id"
          LEFT JOIN "Shop" ON "Watch"."SID" = "Shop"."id"
          LEFT JOIN "ShopWallet" On "Shop"."id" = "ShopWallet"."SID"
        `;
            if (listItem.length === 0)
                throw new common_1.HttpException('Cart is emty', common_1.HttpStatus.BAD_REQUEST);
            global_service_1.globalVariables.cartList[userId] = listItem;
            let total = 0;
            let quantiry = 0;
            listItem.forEach((v) => {
                total += v.quantity * v.price;
                quantiry += v.quantity;
            });
            const location = global_service_1.globalVariables.deliveryLocation[userId];
            let shipFee = await this.delivery.diliveryFee({
                toProvince: location.province,
                toDistrict: location.district,
                toWard: location.district,
                value: total,
                quantity: quantiry,
            });
            switch (global_service_1.globalVariables.deliveryLocation[userId].deliveryOption) {
                case 1:
                    shipFee = Math.round(shipFee * 1.1);
                    break;
                case 2:
                    break;
                case 3:
                    shipFee = Math.round(shipFee * 0.8);
                    break;
            }
            return shipFee;
        }
        catch (error) {
            throw Error();
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