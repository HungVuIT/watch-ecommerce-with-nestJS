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
            const groupedItems = listItem.reduce((acc, item) => {
                const existingGroup = acc.find((group) => group.SID === item.SID);
                if (existingGroup) {
                    existingGroup.items.push(item);
                }
                else {
                    acc.push({ SID: item.SID, items: [item] });
                }
                return acc;
            }, []);
            groupedItems.forEach(({ items }) => {
                items.forEach((item) => {
                    if (item.quantity > item.watchQuantity)
                        throw new common_1.HttpException({
                            message: 'out of stock',
                            itemID: item.WID,
                            itemName: item.name,
                        }, common_1.HttpStatus.NOT_FOUND);
                });
            });
            const location = global_service_1.globalVariables.deliveryLocation[userId];
            const ordersByShop = [];
            for (const group of groupedItems) {
                const shop = await this.prisma.shop.findFirst({ where: { id: group.SID } });
                const quantity = group.items.reduce((acc, item) => acc + item.quantity, 0);
                const total = group.items.reduce((acc, item) => acc + item.price * item.quantity, 0);
                let shipFee = await this.delivery.diliveryFee({
                    fromDistrict: shop.district,
                    fromProvince: shop.province,
                    toProvince: location.province,
                    toDistrict: location.district,
                    toWard: location.district,
                    value: total,
                    quantity: quantity,
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
                const totalPrice = total + shipFee;
                const order = {
                    itemPrice: total,
                    SID: group.SID,
                    items: group.items,
                    shipFee: shipFee,
                    totalPrice: totalPrice,
                };
                ordersByShop.push(order);
            }
            global_service_1.globalVariables.orderList[userId] = groupedItems;
            const orderDetail = ordersByShop.reduce((acc, curr) => {
                return {
                    itemValue: acc.itemValue + curr.itemPrice,
                    shipFee: acc.shipFee + curr.shipFee,
                    total: acc.total + curr.totalPrice,
                };
            }, { itemValue: 0, shipFee: 0, total: 0 });
            global_service_1.globalVariables.orderDetail[userId] = orderDetail;
            const result = {
                href: await this.payment.checkoutLink(userId),
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
            const location = global_service_1.globalVariables.deliveryLocation[userId];
            await this.prisma.$transaction(async (tx) => {
                const listorder = global_service_1.globalVariables.orderList[userId];
                listorder.forEach(async (item) => {
                    await this.prisma.$transaction(async (tx) => {
                        const order = await tx.order.create({
                            data: {
                                UID: userId,
                                SID: item.SID,
                                total: item.totalPrice,
                                paymentMethod: 'online',
                                status: 'created',
                            },
                        });
                        let data = [];
                        item.items.forEach((v) => data.push({
                            OID: order.id,
                            WID: v.WID,
                            quantity: v.quantity,
                            total: v.price * v.quantity,
                            fee: v.price * v.quantity * Number(this.config.get('FEE')),
                        }));
                        await tx.order_detail.createMany({
                            data: data,
                        });
                        const update = item.items.map((item) => {
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
                        switch (location.deliveryOption) {
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
                            data: Object.assign(Object.assign({}, location), { OID: order.id, shipFee: item.shipFee, deliveryOption: deliveryType }),
                        });
                        await tx.cart.deleteMany({
                            where: { UID: userId },
                        });
                    });
                });
                this.glo.deleteUserInfor(userId);
                return listorder;
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
            const groupedItems = listItem.reduce((acc, item) => {
                const existingGroup = acc.find((group) => group.SID === item.SID);
                if (existingGroup) {
                    existingGroup.items.push(item);
                }
                else {
                    acc.push({ SID: item.SID, items: [item] });
                }
                return acc;
            }, []);
            groupedItems.forEach(({ items }) => {
                items.forEach((item) => {
                    if (item.quantity > item.watchQuantity)
                        throw new common_1.HttpException({
                            message: 'out of stock',
                            itemID: item.WID,
                            itemName: item.name,
                        }, common_1.HttpStatus.NOT_FOUND);
                });
            });
            const location = global_service_1.globalVariables.deliveryLocation[userId];
            const ordersByShop = [];
            for (const group of groupedItems) {
                const shop = await this.prisma.shop.findFirst({ where: { id: group.SID } });
                const quantity = group.items.reduce((acc, item) => acc + item.quantity, 0);
                const total = group.items.reduce((acc, item) => acc + item.price * item.quantity, 0);
                let shipFee = await this.delivery.diliveryFee({
                    fromDistrict: shop.district,
                    fromProvince: shop.province,
                    toProvince: location.province,
                    toDistrict: location.district,
                    toWard: location.district,
                    value: total,
                    quantity: quantity,
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
                const totalPrice = total + shipFee;
                const order = {
                    itemPrice: total,
                    SID: group.SID,
                    items: group.items,
                    shipFee: shipFee,
                    totalPrice: totalPrice,
                };
                ordersByShop.push(order);
            }
            global_service_1.globalVariables.orderList[userId] = ordersByShop;
            const orderDetail = ordersByShop.reduce((acc, curr) => {
                return {
                    itemValue: acc.itemValue + curr.itemPrice,
                    shipFee: acc.shipFee + curr.shipFee,
                    total: acc.total + curr.totalPrice,
                };
            }, { itemValue: 0, shipFee: 0, total: 0 });
            global_service_1.globalVariables.orderDetail[userId] = orderDetail;
            await this.prisma.$transaction(async (tx) => {
                const listorder = global_service_1.globalVariables.orderList[userId];
                listorder.forEach(async (item) => {
                    await this.prisma.$transaction(async (tx) => {
                        const order = await tx.order.create({
                            data: {
                                UID: userId,
                                SID: item.SID,
                                total: item.totalPrice,
                                paymentMethod: 'offline',
                                status: 'created',
                            },
                        });
                        let data = [];
                        item.items.forEach((v) => data.push({
                            OID: order.id,
                            WID: v.WID,
                            quantity: v.quantity,
                            total: v.price * v.quantity,
                            fee: v.price * v.quantity * Number(this.config.get('FEE')),
                        }));
                        await tx.order_detail.createMany({
                            data: data,
                        });
                        const update = item.items.map((item) => {
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
                        switch (location.deliveryOption) {
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
                            data: Object.assign(Object.assign({}, location), { OID: order.id, shipFee: item.shipFee, deliveryOption: deliveryType }),
                        });
                        await tx.cart.deleteMany({
                            where: { UID: userId },
                        });
                    });
                });
                this.glo.deleteUserInfor(userId);
                return listorder;
            });
        }
        catch (error) {
            throw error;
        }
    }
    async getOrdersUser(id) {
        try {
            return await this.prisma.order.findMany({
                where: { UID: id },
                orderBy: { createdAt: 'desc' },
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
                    watch: true,
                }
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
            const groupedItems = listItem.reduce((acc, item) => {
                const existingGroup = acc.find((group) => group.SID === item.SID);
                if (existingGroup) {
                    existingGroup.items.push(item);
                }
                else {
                    acc.push({ SID: item.SID, items: [item] });
                }
                return acc;
            }, []);
            groupedItems.forEach(({ items }) => {
                items.forEach((item) => {
                    if (item.quantity > item.watchQuantity)
                        throw new common_1.HttpException({
                            message: 'out of stock',
                            itemID: item.WID,
                            itemName: item.name,
                        }, common_1.HttpStatus.NOT_FOUND);
                });
            });
            const location = global_service_1.globalVariables.deliveryLocation[userId];
            const ordersByShop = [];
            for (const group of groupedItems) {
                const shop = await this.prisma.shop.findFirst({ where: { id: group.SID } });
                const quantity = group.items.reduce((acc, item) => acc + item.quantity, 0);
                const total = group.items.reduce((acc, item) => acc + item.price * item.quantity, 0);
                let shipFee = await this.delivery.diliveryFee({
                    fromDistrict: shop.district,
                    fromProvince: shop.province,
                    toProvince: location.province,
                    toDistrict: location.district,
                    toWard: location.district,
                    value: total,
                    quantity: quantity,
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
                const totalPrice = total + shipFee;
                const order = {
                    itemPrice: total,
                    SID: group.SID,
                    items: group.items,
                    shipFee: shipFee,
                    totalPrice: totalPrice,
                };
                ordersByShop.push(order);
            }
            global_service_1.globalVariables.orderList[userId] = groupedItems;
            const orderDetail = ordersByShop.reduce((acc, curr) => {
                return {
                    itemValue: acc.itemValue + curr.itemPrice,
                    shipFee: acc.shipFee + curr.shipFee,
                    total: acc.total + curr.totalPrice,
                };
            }, { itemValue: 0, shipFee: 0, total: 0 });
            return orderDetail.shipFee;
        }
        catch (error) {
            throw Error();
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
    async payForOrder(id) {
        try {
            if (this.payment.payoutSeller(id))
                return { message: 'success' };
        }
        catch (error) {
            throw error;
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