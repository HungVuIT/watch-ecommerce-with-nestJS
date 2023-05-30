import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { createShopDto } from './dto/createShop.dto';

@Injectable()
export class ShopService {
    constructor(private prisma: PrismaService) {}

    findById(shopId: number) {
        try {
            return this.prisma.shop.findUnique({
                where: { id: shopId },
            });
        } catch (error) {
            console.log('===============ERROR==============');

            console.log(error);

            return new HttpException({ message: 'server conflict', success: false }, HttpStatus.CONFLICT);
        }
    }

    async findMany(option: any) {
        try {
            let query = {};

            if (option.skip) query['skip'] = Number(option.skip);

            if (option.take) query['take'] = Number(option.take);

            if (option.orderBy) {
                let sort = {};

                sort[option.orderBy] = 'asc';

                query['orderBy'] = sort;
            }

            const list = await this.prisma.shop.findMany(query);

            return list;
        } catch (error) {
            console.log('===============ERROR==============');

            console.log(error);

            return new HttpException({ message: 'server conflict', success: false }, HttpStatus.CONFLICT);
        }
    }

    async deleteByUserId(userId: number) {
        try {
            await this.prisma.shop.update({
                where: { UID: userId },
                data: {
                    isActive: false,
                },
            });

            await this.prisma.user.update({
                where: { id: userId },
                data: { role: 'USER' },
            });
        } catch (error) {
            console.log('===============ERROR==============');

            console.log(error);

            return new HttpException({ message: 'server conflict', success: false }, HttpStatus.CONFLICT);
        }
    }

    async updateByUserId(
        id: number,
        body: createShopDto,
        files: {
            logo?: Express.Multer.File[];
            banner?: Express.Multer.File[];
        }
    ) {
        try {
            if (files) {
                if (files.logo) {
                    body.logo = files.logo[0].path;
                }

                if (files.banner) {
                    body.banner = files.banner[0].path;
                }
            }

            const shop = await this.prisma.shop.update({
                where: { UID: id },
                data: body,
            });

            return shop;
        } catch (error) {
            console.log('===============ERROR==============');
            console.log(error);
            return new HttpException({ message: 'server conflict', success: false }, HttpStatus.CONFLICT);
        }
    }

    async updateByShopId(
        id: number,
        body: createShopDto,
        files: {
            logo?: Express.Multer.File[];
            banner?: Express.Multer.File[];
        }
    ) {
        try {
            if (files) {
                if (files.logo) {
                    body.logo = files.logo[0].path;
                }

                if (files.banner) {
                    body.banner = files.banner[0].path;
                }
            }

            const shop = await this.prisma.shop.update({
                where: { id: id },
                data: body,
            });

            return shop;
        } catch (error) {
            console.log('===============ERROR==============');
            console.log(error);
            return new HttpException({ message: 'server conflict', success: false }, HttpStatus.CONFLICT);
        }
    }

    async create(userId: number, body: createShopDto) {
        try {
            const shop = await this.prisma.shop.create({
                data: {
                    UID: userId,
                    ...body,
                },
            });

            await this.prisma.user.update({
                where: { id: userId },
                data: { role: 'VENDOR' },
            });

            return shop;
        } catch (error) {
            console.log('===============ERROR==============');

            console.log(error);

            return new HttpException({ message: 'server conflict', success: false }, HttpStatus.CONFLICT);
        }
    }

    async addPayment(shopId: number, email: string) {
        try {
            return await this.prisma.shopWallet.create({
                data: {
                    paypalMethod: email,
                    SID: shopId,
                },
            });
        } catch (error) {
            console.log('===============ERROR==============');

            console.log(error);

            return new HttpException({ message: 'server conflict', success: false }, HttpStatus.CONFLICT);
        }
    }

    async dashbroad(shopId: number) {
        try {
            // Truy vấn số đơn hàng được đặt cho Shop
            const orderCount = await this.prisma.order.count({
                where: { shop: { id: shopId } },
            });

            // Truy vấn số sản phẩm bán ra cho Shop
            const soldCount = await this.prisma.order_detail.aggregate({
                where: { order: { shop: { id: shopId } } },
                _sum: { quantity: true },
            });

            // Truy vấn số tiền thu được cho Shop
            const revenue = await this.prisma.order.aggregate({
                where: { shop: { id: shopId } },
                _sum: { total: true },
            });

            const watchCount = await this.prisma.watch.count({
                where: { shop: { id: shopId } }
            });


            return {orderCount,soldCount,revenue, watchCount}

        } catch (error) {
            return new HttpException({ message: 'server conflict', success: false }, HttpStatus.CONFLICT);
        }
    }

    async dashbroadAdmin() {
        try {
            // Truy vấn số đơn hàng được đặt cho Shop
            const orderCount = await this.prisma.order.count({

            });

            // Truy vấn số sản phẩm bán ra cho Shop
            const soldCount = await this.prisma.order_detail.aggregate({
                _sum: { quantity: true },
            });

            // Truy vấn số tiền thu được cho Shop
            const revenue = await this.prisma.order.aggregate({
                _sum: { total: true },
            });

            const watchCount = await this.prisma.watch.count({

            });


            return {orderCount,soldCount,revenue, watchCount}

        } catch (error) {
            return new HttpException({ message: 'server conflict', success: false }, HttpStatus.CONFLICT);
        }
    }
}
