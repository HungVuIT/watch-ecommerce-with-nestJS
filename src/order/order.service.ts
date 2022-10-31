import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { createOrderDto } from './dto/createOrder.dto';

@Injectable()
export class OrderService {
  constructor(private prisma: PrismaService) {}

  // Join bảng cart với bảng watch
  // lấy ra thông tin cart với thông tin watch đính kèm
  // tính tổng cart
  // tạo order
  // tạo order detail dựa vào cart
  // giảm số lượng sản phẩm trong kho sau khi order
  // xoá cart sau khi đã order

  async createOrder(userId: number, body: createOrderDto) {
    try {
      const listItem = await this.prisma.cart.findMany({
        where: { UID: userId },
        include: {
          watch: true,
        },
      });

      let total: number = 0;

      listItem.forEach((item) => {
        if (item.quantity > item.watch.quantity)
          throw new HttpException(
            {
              message: 'out of stock',
              itemID: item.WID,
              itemName: item.watch.name,
            },
            HttpStatus.NOT_FOUND,
          );
      });

      listItem.forEach((v) => (total += v.quantity * v.watch.price));

      return await this.prisma.$transaction(async (tx) => {
        const order = await tx.order.create({
          data: {
            UID: userId,
            ...body,
            total: total,
          },
        });

        interface orderDetailData {
          OID: number;
          WID: number;
          quantity: number;
        }

        // const validKey = ['WID', 'quantiry'];
        // const data = listItem.map((v) => {
        //   v['OID'] = order.id;
        //   Object.keys(v).forEach(
        //     (key) => validKey.includes(key) || delete v[key],
        //   );
        // });

        let data: orderDetailData[] = [];

        listItem.forEach((v) =>
          data.push({
            OID: order.id,
            WID: v.WID,
            quantity: v.quantity,
          }),
        );

        const orderDetail = await tx.order_detail.createMany({
          data: data,
        });

        listItem.forEach(async (item) => {
          await tx.watch.update({
            where: { id: item.WID },
            data: {
              quantity: item.watch.quantity - item.quantity,
              saled: item.watch.saled + item.quantity,
            },
          });
        });

        await tx.cart.deleteMany({
          where: { UID: userId },
        });

        return order;
      });
    } catch (error) {
      throw error;
      throw new HttpException(error.message, 500);
    }
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
