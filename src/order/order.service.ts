import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Request, Response } from 'express';
import { PaymentService } from 'src/payment/payment.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { globalVariables } from 'src/shared/global.service';
import { createOrderDto } from './dto/createOrder.dto';

@Injectable()
export class OrderService {
  constructor(private prisma: PrismaService, private payment: PaymentService) {}

  // Join bảng cart với bảng watch
  // lấy ra thông tin cart với thông tin watch đính kèm
  // tính tổng cart
  // tạo order
  // tạo order detail dựa vào cart
  // giảm số lượng sản phẩm trong kho sau khi order
  // xoá cart sau khi đã order

  async createLinkPaymant(userId: number) {
    try {
      // const listItem = await this.prisma.cart.findMany({
      //   where: { UID: userId },
      //   include: {
      //     watch: true,
      //   },
      // });

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
          "Watch"."quantity" as "watchQuantity", 
          "ShopWallet"."paypalMethod"
          FROM "Cart" 
          LEFT JOIN "Watch" ON "Cart"."WID" = "Watch"."id"
          LEFT JOIN "Shop" ON "Watch"."SID" = "Shop"."id"
          LEFT JOIN "ShopWallet" On "Shop"."id" = "ShopWallet"."SID"
        `;

      globalVariables.cartList[userId] = listItem;

      let total: number = 0;

      listItem.forEach((item) => {
        if (item.quantity > item.watchQuantity)
          throw new HttpException(
            {
              message: 'out of stock',
              itemID: item.WID,
              itemName: item.name,
            },
            HttpStatus.NOT_FOUND,
          );
      });

      listItem.forEach((v) => (total += v.quantity * v.price));

      const listItemInPaypal = listItem.map((item) => ({
        name: item.name,
        quantity: item.quantity,
        price: item.price,
      }));

      globalVariables.paymentTotal[userId] = total;

      return this.payment.checkoutLink(userId, listItemInPaypal);
    } catch (error) {
      throw error;
    }
  }

  async completeOrder(userId: number) {
    //this.payment.succcessCheckout()
    //     return await this.prisma.$transaction(async (tx) => {
    //       const order = await tx.order.create({
    //         data: {
    //           UID: userId,
    //           ...body,
    //           total: total,
    //         },
    //       });
    //       interface orderDetailData {
    //         OID: number;
    //         WID: number;
    //         quantity: number;
    //       }
    //       // const validKey = ['WID', 'quantiry'];
    //       // const data = listItem.map((v) => {
    //       //   v['OID'] = order.id;
    //       //   Object.keys(v).forEach(
    //       //     (key) => validKey.includes(key) || delete v[key],
    //       //   );
    //       // });
    //       let data: orderDetailData[] = [];
    //       listItem.forEach((v) =>
    //         data.push({
    //           OID: order.id,
    //           WID: v.WID,
    //           quantity: v.quantity,
    //         }),
    //       );
    //       const orderDetail = await tx.order_detail.createMany({
    //         data: data,
    //       });
    //       // listItem.forEach(async (item) => {
    //       //   await tx.watch.update({
    //       //     where: { id: item.WID },
    //       //     data: {
    //       //       quantity: item.watch.quantity - item.quantity,
    //       //       saled: item.watch.saled + item.quantity,
    //       //     },
    //       //   });
    //       // });
    //       const update = listItem.map((item) => {
    //         tx.watch.update({
    //           where: { id: item.WID },
    //           data: {
    //             quantity: item.watch.quantity - item.quantity,
    //             saled: item.watch.saled + item.quantity,
    //           },
    //         });
    //       });
    //       await Promise.all(update);
    //       await tx.cart.deleteMany({
    //         where: { UID: userId },
    //       });
    //       return order;
    //     });
  }

  async getOrders(userId: number) {
    try {
      return await this.prisma.order.findMany({
        where: { UID: userId },
        orderBy: { createdAt: 'desc' },
      });
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }

  async getOrderDetail(orderId: number) {
    try {
      return await this.prisma.order_detail.findMany({
        where: { OID: orderId },
      });
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }
}
