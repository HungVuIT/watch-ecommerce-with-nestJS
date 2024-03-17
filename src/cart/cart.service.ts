import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { addItemDto } from './dto/addItem.dto';
import { updateItemDto } from './dto/updateItem.dto';

@Injectable()
export class CartService {
    constructor(private prisma: PrismaService) {}

    async getCart(userId: number) {
        try {
            const cart = await this.prisma.cart.findMany({
                where: { UID: userId },
                include: {
                    product: { include: { sale_off: true } },
                },
                orderBy: {
                    createdAt: 'desc',
                },
            });

            return cart;
        } catch (error) {
            throw error;
        }
    }

    async deleteItem(cartId: number) {
        try {
            await this.prisma.cart.delete({
                where: {
                    id: cartId,
                },
            });
        } catch (error) {
            throw error;
        }
    }

    async addItem(userId: number, body: addItemDto) {
        try {
            // const product = await this.prisma.product.findUnique({
            //   where: { id: body.itemId },
            // });

            // if (product.quantity < 1)
            //   throw new HttpException('Hết hàng', HttpStatus.NOT_FOUND);
            const cart = await this.prisma.cart.findFirst({
                where: {
                    UID: userId,
                    PID: body.itemId,
                },
            });

            if (!cart) {
                return await this.prisma.cart.create({
                    data: {
                        UID: userId,
                        PID: body.itemId,
                        quantity: body.quantity || 1,
                    },
                });
            }

            return await this.prisma.cart.update({
                data: {
                    quantity: { increment: body.quantity || 1 },
                },
                where: {
                    id: cart.id,
                },
            });
            // await this.prisma.product.update({
            //   where: { id: body.itemId },
            //   data: { quantity: product.quantity - (body.quantity || 1) },
            // });
        } catch (error) {
            throw error;
        }
    }

    async updateItem(userId: number, body: updateItemDto) {
        try {
            await this.prisma.cart.update({
                where: { id: body.cartId },
                data: { quantity: body.quantity },
            });
        } catch (error) {
            throw error;
        }
    }
}
