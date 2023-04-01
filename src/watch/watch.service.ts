import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { watch } from 'fs';
import { PrismaService } from 'src/prisma/prisma.service';
import { RatingService } from 'src/rating/rating.service';
import { createWatchDto } from './dto/createWatch.dto';
import { updateWatchDto } from './dto/updateWatch.dto';

@Injectable()
export class WatchService {
    constructor(private prisma: PrismaService, private ratingService: RatingService) {}

    async delete(prodcutId: number) {
        try {
            return await this.prisma.watch.delete({
                where: { id: prodcutId },
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
            
            if (option.search) query['where'].AND.push({ name: {contains: option.search, mode: 'insensitive'} });

            if (option.shopId) query['where'].AND.push({ SID: Number(option.shopId) });

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

            query['include'] = { sale_off: true };

            const list = await this.prisma.watch.findMany(query);

            await Promise.all(list.map((watch) => this.ratingService.getProductRate(watch.id))).then((rates) => {
                list.map((watch, index) => {
                    watch['rating'] = rates[index];
                });
            });

            return list;
        } catch (error) {
            throw error;
        }
    }

    async findOne(watchID: number) {
        try {
            const watch = await this.prisma.watch.findUnique({
                where: { id: watchID },
                include: { sale_off: true },
            });

            const rating = await this.ratingService.getProductRate(watchID);

            watch['rating'] = rating;

            return watch;
        } catch (error) {
            throw error;
        }
    }

    async isOwner(shopId: number, productId: number) {
        try {
            const watch = await this.prisma.watch.findUnique({
                where: { id: productId },
            });

            if (watch.SID === shopId) return;
            else throw new Error('you not own this product');
        } catch (error) {
            throw error;
        }
    }

    async update(productId: number, body: updateWatchDto, imageFiles: any) {
        try {
            if (imageFiles) {
                let image: string[] = [];
                imageFiles.forEach((v) => image.push(v.path));

                body.image = image;
            }

            const watch = await this.prisma.watch.update({
                where: { id: productId },
                data: body,
            });

            return watch;
        } catch (error) {
            throw error;
        }
    }

    async create(shopId: number, body: createWatchDto, imageFiles: any) {
        try {
            if (imageFiles) {
                let image: string[] = [];

                imageFiles.forEach((v: any) => image.push(v.path));

                body.image = image;
            }

            const watch = await this.prisma.watch.create({
                data: { SID: shopId, ...body },
            });

            return watch;
        } catch (error) {
            throw error;
        }
    }

    async search(txt: string) {
        txt = txt.trim();

        return await this.prisma.watch.findMany({
            where: {
                name: {
                    contains: txt,
                },
            },
            take: 10,
        });
    }
}
