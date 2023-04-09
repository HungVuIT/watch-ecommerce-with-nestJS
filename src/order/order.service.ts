import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { deliveryOption } from '@prisma/client';
import { DeliveryService } from 'src/delivery/delivery.service';
import { PaymentService } from 'src/payment/payment.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { globalVariables } from 'src/shared/global.service';

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
        `;

            if (listItem.length === 0) throw new HttpException('Cart is emty', HttpStatus.BAD_REQUEST);

            globalVariables.cartList[userId] = listItem;

            let total: number = 0;

            let quantiry: number = 0;

            // Kiểm tra xem trng kho còn đủ hàng không
            listItem.forEach((item) => {
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

            // Tính tổng tiền hàng và số lượng sản phẩm của đơn hàng
            listItem.forEach((v) => {
                total += v.quantity * v.price;
                quantiry += v.quantity;
            });

            const listItemInPaypal = listItem.map((item) => ({
                name: item.name,
                quantity: item.quantity,
                price: item.price,
            }));

            // Tính chi phí ship hàng
            const location = globalVariables.deliveryLocation[userId];

            let shipFee = await this.delivery.diliveryFee({
                toProvince: location.province,
                toDistrict: location.district,
                toWard: location.district,
                value: total,
                quantity: quantiry,
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

            globalVariables.orderDetail[userId] = {
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
        } catch (error) {
            throw error;
        }
    }

    async completeOrder(userId: number) {
        try {
            // Hoàn thiện checkout
            await this.payment.succcessCheckout(userId);

            // Tự động thanh toán cho các chủ shop dựa trên cart của người dùng
            await this.payment.payoutSeller(userId);

            return await this.prisma.$transaction(async (tx) => {
                const { total } = globalVariables.orderDetail[userId];

                const order = await tx.order.create({
                    data: {
                        UID: userId,
                        total: total,
                        paymentMethod: 'online',
                    },
                });

                // const validKey = ['WID', 'quantiry'];
                // const data = listItem.map((v) => {
                //   v['OID'] = order.id;
                //   Object.keys(v).forEach(
                //     (key) => validKey.includes(key) || delete v[key],
                //   );
                // });

                interface orderDetailData {
                    OID: number;
                    WID: number;
                    quantity: number;
                    total: number;
                    fee: number;
                }

                let data: orderDetailData[] = [];

                const listItem = globalVariables.cartList[userId];

                listItem.forEach((v) =>
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

                // listItem.forEach(async (item) => {
                //   await tx.watch.update({
                //     where: { id: item.WID },
                //     data: {
                //       quantity: item.watch.quantity - item.quantity,
                //       saled: item.watch.saled + item.quantity,
                //     },
                //   });
                // });

                const update = listItem.map((item) => {
                    tx.watch.update({
                        where: { id: item.WID },
                        data: {
                            quantity: { increment: -item.quantity },
                            saled: { increment: item.quantity },
                        },
                    });
                });

                // Dùng promise all nhanh hơn for each
                await Promise.all(update);

                let deliveryType: deliveryOption = deliveryOption.standard;

                switch (globalVariables.deliveryLocation[userId].deliveryOption) {
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
                        ...globalVariables.deliveryLocation[userId],
                        OID: order.id,
                        shipFee: globalVariables.orderDetail[userId].shipFee,
                        deliveryOption: deliveryType,
                    },
                });

                await tx.cart.deleteMany({
                    where: { UID: userId },
                });

                this.glo.deleteUserInfor(userId);

                return order;
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
        `;

            if (listItem.length === 0) throw new HttpException('Cart is emty', HttpStatus.BAD_REQUEST);

            globalVariables.cartList[userId] = listItem;

            let total: number = 0;

            let quantiry: number = 0;

            // Kiểm tra xem trng kho còn đủ hàng không
            listItem.forEach((item) => {
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

            // Tính tổng tiền hàng và số lượng sản phẩm của đơn hàng
            listItem.forEach((v) => {
                total += v.quantity * v.price;
                quantiry += v.quantity;
            });

            const listItemInPaypal = listItem.map((item) => ({
                name: item.name,
                quantity: item.quantity,
                price: item.price,
            }));

            // Tính chi phí ship hàng
            const location = globalVariables.deliveryLocation[userId];

            let shipFee = await this.delivery.diliveryFee({
                toProvince: location.province,
                toDistrict: location.district,
                toWard: location.district,
                value: total,
                quantity: quantiry,
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

            globalVariables.orderDetail[userId] = {
                shipFee: shipFee,
                itemValue: total,
                total: shipFee + total,
            };

            return await this.prisma.$transaction(async (tx) => {
                const { total } = globalVariables.orderDetail[userId];

                const order = await tx.order.create({
                    data: {
                        UID: userId,
                        total: total,
                        paymentMethod: 'offline',
                    },
                });

                // const validKey = ['WID', 'quantiry'];
                // const data = listItem.map((v) => {
                //   v['OID'] = order.id;
                //   Object.keys(v).forEach(
                //     (key) => validKey.includes(key) || delete v[key],
                //   );
                // });

                interface orderDetailData {
                    OID: number;
                    WID: number;
                    quantity: number;
                    total: number;
                    fee: number;
                }

                let data: orderDetailData[] = [];

                const listItem = globalVariables.cartList[userId];

                listItem.forEach((v) =>
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

                // listItem.forEach(async (item) => {
                //   await tx.watch.update({
                //     where: { id: item.WID },
                //     data: {
                //       quantity: item.watch.quantity - item.quantity,
                //       saled: item.watch.saled + item.quantity,
                //     },
                //   });
                // });

                const update = listItem.map((item) => {
                    tx.watch.update({
                        where: { id: item.WID },
                        data: {
                            quantity: { increment: -item.quantity },
                            saled: { increment: item.quantity },
                        },
                    });
                });

                // Dùng promise all nhanh hơn for each
                await Promise.all(update);

                let deliveryType: deliveryOption = deliveryOption.standard;

                switch (globalVariables.deliveryLocation[userId].deliveryOption) {
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
                        ...globalVariables.deliveryLocation[userId],
                        OID: order.id,
                        shipFee: globalVariables.orderDetail[userId].shipFee,
                        deliveryOption: deliveryType,
                    },
                });

                await tx.cart.deleteMany({
                    where: { UID: userId },
                });

                this.glo.deleteUserInfor(userId);

                return order;
            });
        } catch (error) {
            throw error;
        }
    }

    async getOrders(userId: number) {
        try {
            return await this.prisma.order.findMany({
                where: { UID: userId },
                orderBy: { createdAt: 'desc' },
            });
        } catch (error) {
            throw error;
        }
    }

    async getOrderDetail(orderId: number) {
        try {
            return await this.prisma.order_detail.findMany({
                where: { OID: orderId },
            });
        } catch (error) {
            throw error;
        }
    }

    async getDeliveryFree(userId: number) {
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
        `;

            if (listItem.length === 0) throw new HttpException('Cart is emty', HttpStatus.BAD_REQUEST);

            globalVariables.cartList[userId] = listItem;

            let total: number = 0;

            let quantiry: number = 0;

            // Tính tổng tiền hàng và số lượng sản phẩm của đơn hàng
            listItem.forEach((v) => {
                total += v.quantity * v.price;
                quantiry += v.quantity;
            });

            // Tính chi phí ship hàng
            const location = globalVariables.deliveryLocation[userId];

            let shipFee = await this.delivery.diliveryFee({
                toProvince: location.province,
                toDistrict: location.district,
                toWard: location.district,
                value: total,
                quantity: quantiry,
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

            return shipFee;
        } catch (error) {
            throw Error();
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
}
