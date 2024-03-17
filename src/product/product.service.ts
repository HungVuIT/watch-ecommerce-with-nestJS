import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { RatingService } from 'src/rating/rating.service';
import { createProductDto } from './dto/createProduct.dto';
import { updateProductDto } from './dto/updateProduct.dto';

@Injectable()
export class ProductService {
    constructor(private prisma: PrismaService, private ratingService: RatingService) {}

    async delete(prodcutId: number) {
        try {
            return await this.prisma.product.update({
                where: { id: prodcutId },
                data: {
                    isActive: false,
                },
            });
        } catch (error) {
            throw error;
        }
    }

    async findMany(option: any) {
        try {
            let query = {};

            if (option.skip) query['skip'] = Number(option.skip);

            if (option.take) query['take'] = Number(option.take);

            query['where'] = { AND: [] };

            if (option.search) query['where'].AND.push({ name: { contains: option.search, mode: 'insensitive' } });

            if (option.SID) query['where'].AND.push({ SID: Number(option.SID) });

            if (option.BID) query['where'].AND.push({ BID: Number(option.BID) });

            if (option.CID) query['where'].AND.push({ CID: Number(option.CID) });

            if (option.price) {
                const value = option.price.split(':');
                query['where'].AND.push({
                    price: { gte: Number(value[0]), lte: Number(value[1]) },
                });
            }

            if (option.orderBy) {
                const value = option.orderBy.split('.');

                let sort = {};

                sort[value[0]] = value[1];

                query['orderBy'] = sort;
            }

            // query['include'] = { sale_off: true, shop: true };

            const list = await this.prisma.product.findMany(query);

            let result = list;

            // if (option.saleOff) {
            //     result = result.filter((item: any) => {
            //         return item.sale_off !== null ? true : false;
            //     });

            //     if (option.saleOff === 'desc') result.sort((a: any, b: any) => b.sale_off.amount - a.sale_off.amount);
            //     if (option.saleOff === 'asc') result.sort((a: any, b: any) => a.sale_off.amount - b.sale_off.amount);
            // }

            if (option.province)
                result = result.filter((item: any) => {
                    return item.shop.province === option.province ? true : false;
                });

            if (option.district)
                result = result.filter((item: any) => {
                    return item.shop.district === option.district ? true : false;
                });

            await Promise.all(result.map((product) => this.ratingService.getProductRate(product.id))).then((rates) => {
                result.map((product, index) => {
                    product['rating'] = rates[index];
                });
            });

            return result;
        } catch (error) {
            throw error;
        }
    }

    async findOne(productID: number) {
        try {
            const product = await this.prisma.product.findUnique({
                where: { id: productID },
                include: { sale_off: true },
            });

            const rating = await this.ratingService.getProductRate(productID);

            product['rating'] = rating;

            return product;
        } catch (error) {
            throw error;
        }
    }

    async isOwner(shopId: number, productId: number) {
        try {
            const product = await this.prisma.product.findUnique({
                where: { id: productId },
            });

            if (product.SID === shopId) return;
            else throw new Error('you not own this product');
        } catch (error) {
            throw error;
        }
    }

    async update(productId: number, body: updateProductDto, imageFiles: any) {
        try {
            if (imageFiles) {
                let image: string[] = [];
                imageFiles.forEach((v) => image.push(v.path));

                body.image = image;
            }

            const product = await this.prisma.product.update({
                where: { id: productId },
                data: { ...body, isHome: body.isHome === 1 ? true : false },
            });

            return product;
        } catch (error) {
            throw error;
        }
    }

    async create(shopId: number, body: createProductDto, imageFiles: any) {
        try {
            if (imageFiles) {
                let image: string[] = [];

                imageFiles.forEach((v: any) => image.push(v.path));

                body.image = image;
            }
            const product = await this.prisma.product.create({
                data: { ...body, SID: shopId, isHome: body.isHome ? true : false },
            });

            return product;
        } catch (error) {
            throw error;
        }
    }

    async search(txt: string) {
        txt = txt.trim();

        return await this.prisma.product.findMany({
            where: {
                name: {
                    contains: txt,
                },
            },
            take: 10,
        });
    }
}
