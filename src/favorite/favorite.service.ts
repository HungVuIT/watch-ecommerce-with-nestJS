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
                    watch: true,
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
            // const watch = await this.prisma.watch.findUnique({
            //   where: { id: body.itemId },
            // });

            // if (watch.quantity < 1)
            //   throw new HttpException('Hết hàng', HttpStatus.NOT_FOUND);
            const favorite = await this.prisma.favorite.findFirst({
                where: {
                    UID: userId,
                    WID: body.itemId,
                },
            });

            if (!favorite) {
                return await this.prisma.favorite.create({
                    data: {
                        UID: userId,
                        WID: body.itemId
                    },
                });
            }
            // await this.prisma.watch.update({
            //   where: { id: body.itemId },
            //   data: { quantity: watch.quantity - (body.quantity || 1) },
            // });
        } catch (error) {
            throw error;
        }
    }
}
