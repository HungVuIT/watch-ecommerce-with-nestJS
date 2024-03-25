"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const rating_service_1 = require("../rating/rating.service");
let ProductService = class ProductService {
    constructor(prisma, ratingService) {
        this.prisma = prisma;
        this.ratingService = ratingService;
    }
    async delete(prodcutId) {
        try {
            return await this.prisma.product.update({
                where: { id: prodcutId },
                data: {
                    isActive: false,
                },
            });
        }
        catch (error) {
            throw error;
        }
    }
    async findMany(option) {
        try {
            let query = {};
            if (option.skip)
                query['skip'] = Number(option.skip);
            if (option.take)
                query['take'] = Number(option.take);
            query['where'] = { AND: [] };
            if (option.search)
                query['where'].AND.push({ name: { contains: option.search, mode: 'insensitive' } });
            if (option.SID)
                query['where'].AND.push({ SID: Number(option.SID) });
            if (option.BID)
                query['where'].AND.push({ BID: Number(option.BID) });
            if (option.CID)
                query['where'].AND.push({ CID: Number(option.CID) });
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
            const list = await this.prisma.product.findMany(query);
            let result = list;
            if (option.province)
                result = result.filter((item) => {
                    return item.shop.province === option.province ? true : false;
                });
            if (option.district)
                result = result.filter((item) => {
                    return item.shop.district === option.district ? true : false;
                });
            await Promise.all(result.map((product) => this.ratingService.getProductRate(product.id))).then((rates) => {
                result.map((product, index) => {
                    product['rating'] = rates[index];
                });
            });
            return result;
        }
        catch (error) {
            throw error;
        }
    }
    async findOne(productID) {
        try {
            const product = await this.prisma.product.findUnique({
                where: { id: productID },
                include: { sale_off: true },
            });
            const rating = await this.ratingService.getProductRate(productID);
            product['rating'] = rating;
            return product;
        }
        catch (error) {
            throw error;
        }
    }
    async isOwner(shopId, productId) {
        try {
            const product = await this.prisma.product.findUnique({
                where: { id: productId },
            });
            if (product.SID === shopId)
                return;
            else
                throw new Error('you not own this product');
        }
        catch (error) {
            throw error;
        }
    }
    async update(productId, body, imageFiles) {
        try {
            if (imageFiles) {
                let image = [];
                imageFiles.forEach((v) => image.push(v.path));
                body.image = image;
            }
            const product = await this.prisma.product.update({
                where: { id: productId },
                data: Object.assign(Object.assign({}, body), { isHome: body.isHome === 1 ? true : false }),
            });
            return product;
        }
        catch (error) {
            throw error;
        }
    }
    async create(shopId, body, imageFiles) {
        try {
            if (imageFiles) {
                let image = [];
                imageFiles.forEach((v) => image.push(v.path));
                body.image = image;
            }
            const product = await this.prisma.product.create({
                data: Object.assign(Object.assign({}, body), { SID: shopId, isHome: body.isHome ? true : false }),
            });
            return product;
        }
        catch (error) {
            throw error;
        }
    }
    async search(txt) {
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
};
ProductService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService, rating_service_1.RatingService])
], ProductService);
exports.ProductService = ProductService;
//# sourceMappingURL=product.service.js.map