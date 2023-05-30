import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { deliveryOption } from '@prisma/client';
import { DeliveryService } from 'src/delivery/delivery.service';
import { PaymentService } from 'src/payment/payment.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { globalVariables } from 'src/shared/global.service';


interface Cart {
    id: number;
    quantity: number;
    WID: number;
    UID: number;
    SID: number;
    name: string;
    price: number;
    watchQuantity: number;
    paypalMethod: string;
}

interface CartGroupedByShop {
    SID: number;
    items: Cart[];
}

export interface OrderByShop extends CartGroupedByShop {
    itemPrice: number;
    shipFee: number;
    totalPrice: number;
    code: string;
}

@Injectable()
export class OrderService {
    constructor(
        private prisma: PrismaService,
        private payment: PaymentService,
        private delivery: DeliveryService,
        private config: ConfigService,
        private glo: globalVariables
    ) {}

    // Join bảng cart với bảng watch
    // lấy ra thông tin cart với thông tin watch đính kèm
    // tính tổng cart
    // tạo order
    // tạo order detail dựa vào cart
    // giảm số lượng sản phẩm trong kho sau khi order
    // xoá cart sau khi đã order

    async createLinkPaymant(userId: number) {
        try {
            // trong postgresql table name nên để trong " " nếu không sẽ tự chuyển thành in thường -> lỗi ko tìm thấy
            // chi tiết đọc tại https://stackoverflow.com/questions/26631205/postgresql-error-42p01-relation-table-does-not-exist

            const listItem: Cart[] = await this.prisma.$queryRaw`
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
          WHERE "Cart"."UID" = ${userId};
        `;

            if (listItem.length === 0) throw new HttpException('Cart is emty', HttpStatus.BAD_REQUEST);

            for (const item of listItem) {
                const watch = await this.prisma.watch.findFirst({where: {id: item.WID}, include: {sale_off: true}})
                item.price = watch.sale_off.amount ? item.price -  watch.sale_off.amount: item.price
            }

            const groupedItems: CartGroupedByShop[] = listItem.reduce((acc: CartGroupedByShop[], item: Cart) => {
                const existingGroup = acc.find((group) => group.SID === item.SID);
                if (existingGroup) {
                    existingGroup.items.push(item);
                } else {
                    acc.push({ SID: item.SID, items: [item] });
                }
                return acc;
            }, []);

            // Kiểm tra xem trng kho còn đủ hàng không
            groupedItems.forEach(({ items }) => {
                items.forEach((item) => {
                    if (item.quantity > item.watchQuantity)
                        throw new HttpException(
                            {
                                message: 'out of stock',
                                itemID: item.WID,
                                itemName: item.name,
                            },
                            HttpStatus.NOT_FOUND
                        );
                });
            });

            // Tính tổng tiền hàng và số lượng sản phẩm của đơn hàng

            // const listItemInPaypal = listItem.map((item) => ({
            //     name: item.name,
            //     quantity: item.quantity,
            //     price: item.price,
            // }));

            // Tính chi phí ship hàng
            const location = globalVariables.deliveryLocation[userId];

            const ordersByShop: OrderByShop[] = [];

            const code = this.generateOrderCode()

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

                switch (globalVariables.deliveryLocation[userId].deliveryOption) {
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

                const order: OrderByShop = {
                    itemPrice: total,
                    SID: group.SID,
                    items: group.items,
                    shipFee: shipFee,
                    totalPrice: totalPrice,
                    code: code + '.' + Date.now().toString().slice(-5)
                };
                ordersByShop.push(order);
            }

            globalVariables.orderList[userId] = ordersByShop;

            const orderDetail = ordersByShop.reduce(
                (acc, curr) => {
                    return {
                        itemValue: acc.itemValue + curr.itemPrice,
                        shipFee: acc.shipFee + curr.shipFee,
                        total: acc.total + curr.totalPrice,
                    };
                },
                { itemValue: 0, shipFee: 0, total: 0 }
            );

            globalVariables.orderDetail[userId] = orderDetail;

            const result = {
                href: await this.payment.checkoutLink(userId),
            };

            return result;
        } catch (error) {
            throw error;
        }
    }

    async completeOrder(userId: number) {
        try {
            // Hoàn thiện checkout
            await this.payment.succcessCheckout(userId);

            // // Tự động thanh toán cho các chủ shop dựa trên cart của người dùng
            // await this.payment.payoutSeller(userId);
            const location = globalVariables.deliveryLocation[userId];

            await this.prisma.$transaction(async (tx) => {
                const listorder: OrderByShop[] = globalVariables.orderList[userId];

                listorder.forEach(async (item) => {
                    await this.prisma.$transaction(async (tx) => {
                        const order = await tx.order.create({
                            data: {
                                code: item.code,
                                UID: userId,
                                SID: item.SID,
                                total: item.totalPrice,
                                paymentMethod: 'online',
                                status: 'created',
                                userPay: true,
                            },
                        });

                        interface orderDetailData {
                            OID: number;
                            WID: number;
                            quantity: number;
                            total: number;
                            fee: number;
                        }

                        let data: orderDetailData[] = [];

                        item.items.forEach((v) =>
                            data.push({
                                OID: order.id,
                                WID: v.WID,
                                quantity: v.quantity,
                                total: v.price * v.quantity,
                                fee: v.price * v.quantity * Number(this.config.get('FEE')),
                            })
                        );

                        await tx.order_detail.createMany({
                            data: data,
                        });

                        const updates = item.items.map((item) =>
                            tx.watch.update({
                                where: { id: item.WID },
                                data: {
                                    quantity: { decrement: item.quantity },
                                    saled: { increment: item.quantity },
                                },
                            })
                        );

                        await Promise.all(updates);

                        let deliveryType: deliveryOption = deliveryOption.standard;

                        switch (location.deliveryOption) {
                            case 1:
                                deliveryType = deliveryOption.express;
                                break;
                            case 2:
                                deliveryType = deliveryOption.standard;
                                break;
                            case 3:
                                deliveryType = deliveryOption.saving;
                                break;
                        }

                        await tx.delivery_detail.create({
                            data: {
                                ...location,
                                OID: order.id,
                                shipFee: item.shipFee,
                                deliveryOption: deliveryType,
                            },
                        });

                        await tx.cart.deleteMany({
                            where: { UID: userId },
                        });
                    });
                });

                this.glo.deleteUserInfor(userId);

                return listorder;
            });
        } catch (error) {
            throw error;
        }
    }

    async cashOnDelivery(userId: number) {
        try {
            // trong postgresql table name nên để trong " " nếu không sẽ tự chuyển thành in thường -> lỗi ko tìm thấy
            // chi tiết đọc tại https://stackoverflow.com/questions/26631205/postgresql-error-42p01-relation-table-does-not-exist
            const listItem: {
                id: number;
                quantity: number;
                WID: number;
                UID: number;
                name: string;
                price: number;
                watchQuantity: number;
                paypalMethod: string;
            }[] = await this.prisma.$queryRaw`
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
          WHERE "Cart"."UID" = ${userId};
        `;

            if (listItem.length === 0) throw new HttpException('Cart is emty', HttpStatus.BAD_REQUEST);

            for (const item of listItem) {
                const watch = await this.prisma.watch.findFirst({where: {id: item.WID}, include: {sale_off: true}})
                item.price = watch.sale_off.amount ? item.price -  watch.sale_off.amount: item.price
            }

            const groupedItems: CartGroupedByShop[] = listItem.reduce((acc: CartGroupedByShop[], item: Cart) => {
                const existingGroup = acc.find((group) => group.SID === item.SID);
                if (existingGroup) {
                    existingGroup.items.push(item);
                } else {
                    acc.push({ SID: item.SID, items: [item] });
                }
                return acc;
            }, []);

            // Kiểm tra xem trng kho còn đủ hàng không
            groupedItems.forEach(({ items }) => {
                items.forEach((item) => {
                    if (item.quantity > item.watchQuantity)
                        throw new HttpException(
                            {
                                message: 'out of stock',
                                itemID: item.WID,
                                itemName: item.name,
                            },
                            HttpStatus.NOT_FOUND
                        );
                });
            });

            const location = globalVariables.deliveryLocation[userId];

            const ordersByShop: OrderByShop[] = [];

            const code = this.generateOrderCode()

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

                switch (globalVariables.deliveryLocation[userId].deliveryOption) {
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

                const order: OrderByShop = {
                    itemPrice: total,
                    SID: group.SID,
                    items: group.items,
                    shipFee: shipFee,
                    totalPrice: totalPrice,
                    code: code + '.' + Date.now().toString().slice(-5)
                };
                ordersByShop.push(order);
            }

            globalVariables.orderList[userId] = ordersByShop;

            const orderDetail = ordersByShop.reduce(
                (acc, curr) => {
                    return {
                        itemValue: acc.itemValue + curr.itemPrice,
                        shipFee: acc.shipFee + curr.shipFee,
                        total: acc.total + curr.totalPrice,
                    };
                },
                { itemValue: 0, shipFee: 0, total: 0 }
            );

            globalVariables.orderDetail[userId] = orderDetail;

            await this.prisma.$transaction(async (tx) => {
                const listorder: OrderByShop[] = globalVariables.orderList[userId];

                listorder.forEach(async (item) => {
                    await this.prisma.$transaction(async (tx) => {
                        const order = await tx.order.create({
                            data: {
                                code: item.code,
                                UID: userId,
                                SID: item.SID,
                                total: item.totalPrice,
                                paymentMethod: 'offline',
                                status: 'created',
                            },
                        });

                        interface orderDetailData {
                            OID: number;
                            WID: number;
                            quantity: number;
                            total: number;
                            fee: number;
                        }

                        let data: orderDetailData[] = [];

                        item.items.forEach((v) =>
                            data.push({
                                OID: order.id,
                                WID: v.WID,
                                quantity: v.quantity,
                                total: v.price * v.quantity,
                                fee: v.price * v.quantity * Number(this.config.get('FEE')),
                            })
                        );

                        await tx.order_detail.createMany({
                            data: data,
                        });

                        const updates = item.items.map((item) =>
                            tx.watch.update({
                                where: { id: item.WID },
                                data: {
                                    quantity: { decrement: item.quantity },
                                    saled: { increment: item.quantity },
                                },
                            })
                        );

                        await Promise.all(updates);

                        let deliveryType: deliveryOption = deliveryOption.standard;

                        switch (location.deliveryOption) {
                            case 1:
                                deliveryType = deliveryOption.express;
                                break;
                            case 2:
                                deliveryType = deliveryOption.standard;
                                break;
                            case 3:
                                deliveryType = deliveryOption.saving;
                                break;
                        }

                        await tx.delivery_detail.create({
                            data: {
                                ...location,
                                OID: order.id,
                                shipFee: item.shipFee,
                                deliveryOption: deliveryType,
                            },
                        });

                        await tx.cart.deleteMany({
                            where: { UID: userId },
                        });
                    });
                });

                this.glo.deleteUserInfor(userId);

                return listorder;
            });
        } catch (error) {
            throw error;
        }
    }

    async getOrdersUser(id: number) {
        try {
            return await this.prisma.order.findMany({
                where: { UID: id },
                orderBy: { createdAt: 'desc' },
                include: {
                    Delivery_detail: true,
                    Order_detail: true,
                    shop: true
                }
            });
        } catch (error) {
            throw error;
        }
    }

    async getOrdersShop(id: number) {
        try {
            return await this.prisma.order.findMany({
                where: { SID: id },
                orderBy: { createdAt: 'desc' },
                include: {
                    Delivery_detail: true,
                    Order_detail: true,
                    shop: true
                }
            });
        } catch (error) {
            throw error;
        }
    }

    async getOrdersAdmin() {
        try {
            return await this.prisma.order.findMany({
                orderBy: { createdAt: 'desc' },
                include: {
                    Delivery_detail: true,
                    Order_detail: true,
                    shop: true
                }
            });
        } catch (error) {
            throw error;
        }
    }

    async getOrderDetail(orderId: number) {
        try {
            return await this.prisma.order_detail.findMany({
                where: { OID: orderId },
                include: {
                    watch: true,
                    order: {
                        include: {
                            shop: true,
                            user: true,
                        },
                    },
                },
            });
        } catch (error) {
            throw error;
        }
    }

    async getDeliveryFree(userId: number) {
        try {
            const listItem: {
                id: number;
                quantity: number;
                WID: number;
                UID: number;
                name: string;
                price: number;
                watchQuantity: number;
                paypalMethod: string;
            }[] = await this.prisma.$queryRaw`
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
      WHERE "Cart"."UID" = ${userId};
    `;

            if (listItem.length === 0) throw new HttpException('Cart is emty', HttpStatus.BAD_REQUEST);

            const groupedItems: CartGroupedByShop[] = listItem.reduce((acc: CartGroupedByShop[], item: Cart) => {
                const existingGroup = acc.find((group) => group.SID === item.SID);
                if (existingGroup) {
                    existingGroup.items.push(item);
                } else {
                    acc.push({ SID: item.SID, items: [item] });
                }
                return acc;
            }, []);

            // Kiểm tra xem trng kho còn đủ hàng không
            groupedItems.forEach(({ items }) => {
                items.forEach((item) => {
                    if (item.quantity > item.watchQuantity)
                        throw new HttpException(
                            {
                                message: 'out of stock',
                                itemID: item.WID,
                                itemName: item.name,
                            },
                            HttpStatus.NOT_FOUND
                        );
                });
            });

            const location = globalVariables.deliveryLocation[userId];

            const ordersByShop: OrderByShop[] = [];

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

                switch (globalVariables.deliveryLocation[userId].deliveryOption) {
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

                const order: OrderByShop = {
                    itemPrice: total,
                    SID: group.SID,
                    items: group.items,
                    shipFee: shipFee,
                    totalPrice: totalPrice,
                    code: "none"
                };
                ordersByShop.push(order);
            }

            globalVariables.orderList[userId] = groupedItems;

            const orderDetail = ordersByShop.reduce(
                (acc, curr) => {
                    return {
                        itemValue: acc.itemValue + curr.itemPrice,
                        shipFee: acc.shipFee + curr.shipFee,
                        total: acc.total + curr.totalPrice,
                    };
                },
                { itemValue: 0, shipFee: 0, total: 0 }
            );

            return orderDetail.shipFee;
        } catch (error) {
            throw Error();
        }
    }

    async updateOrder(id: number, body: any) {
        try {
            await this.prisma.order.update({
                where: { id: id },
                data: {
                    status: body.status,
                },
            });
        } catch (error) {
            throw error;
        }
    }

    async deleteOrder(id: number) {
        try {
            await this.prisma.order.delete({
                where: { id: id },
            });
        } catch (error) {
            throw Error('cant delete');
        }
    }

    async payForOrder(id: number) {
        try {
            if (this.payment.payoutSeller(id)) return { message: 'success' };
        } catch (error) {
            throw error;
        }
    }

    private generateOrderCode(){
        const charSet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        var randomString = '';
        for (var i = 0; i < 8; i++) {
            var randomPoz = Math.floor(Math.random() * charSet.length);
            randomString += charSet.substring(randomPoz,randomPoz+1);
        }
        return randomString;
    }
}
