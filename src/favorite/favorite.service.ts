import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { addItemDto } from './dto/addItem.dto';


@Injectable()
export class FavoriteService {
    constructor(private prisma: PrismaService) {}

    async getList(userId: number) {
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
        } catch (error) {
            throw error;
        }
    }

    async deleteItem(favoriteId: number) {
        try {
            await this.prisma.favorite.delete({
                where: {
                    id: favoriteId,
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
            // await this.prisma.product.update({
            //   where: { id: body.itemId },
            //   data: { quantity: product.quantity - (body.quantity || 1) },
            // });
        } catch (error) {
            throw error;
        }
    }
}
