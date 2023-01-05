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
exports.ShopService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let ShopService = class ShopService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    findById(shopId) {
        try {
            return this.prisma.shop.findUnique({
                where: { id: shopId },
            });
        }
        catch (error) {
            console.log('===============ERROR==============');
            console.log(error);
            return new common_1.HttpException({ message: 'server conflict', success: false }, common_1.HttpStatus.CONFLICT);
        }
    }
    async findMany(option) {
        try {
            let query = {};
            if (option.skip)
                query['skip'] = Number(option.skip);
            if (option.take)
                query['take'] = Number(option.take);
            if (option.orderBy) {
                let sort = {};
                sort[option.orderBy] = 'asc';
                query['orderBy'] = sort;
            }
            const list = await this.prisma.shop.findMany(query);
            return list;
        }
        catch (error) {
            console.log('===============ERROR==============');
            console.log(error);
            return new common_1.HttpException({ message: 'server conflict', success: false }, common_1.HttpStatus.CONFLICT);
        }
    }
    async deleteByUserId(userId) {
        try {
            await this.prisma.shop.delete({
                where: { UID: userId },
            });
            await this.prisma.user.update({
                where: { id: userId },
                data: { role: 'USER' },
            });
        }
        catch (error) {
            console.log('===============ERROR==============');
            console.log(error);
            return new common_1.HttpException({ message: 'server conflict', success: false }, common_1.HttpStatus.CONFLICT);
        }
    }
    async updateByUserId(id, body, files) {
        try {
            if (files.logo) {
                body.logo = files.logo[0].path;
            }
            if (files.banner) {
                body.banner = files.banner[0].path;
            }
            const shop = await this.prisma.shop.update({
                where: { UID: id },
                data: body,
            });
            return shop;
        }
        catch (error) {
            console.log('===============ERROR==============');
            console.log(error);
            return new common_1.HttpException({ message: 'server conflict', success: false }, common_1.HttpStatus.CONFLICT);
        }
    }
    async create(userId, body) {
        try {
            const shop = await this.prisma.shop.create({
                data: Object.assign({ UID: userId }, body),
            });
            await this.prisma.user.update({
                where: { id: userId },
                data: { role: 'VENDOR' },
            });
            return shop;
        }
        catch (error) {
            console.log('===============ERROR==============');
            console.log(error);
            return new common_1.HttpException({ message: 'server conflict', success: false }, common_1.HttpStatus.CONFLICT);
        }
    }
    myShop() { }
    async addPayment(shopId, email) {
        try {
            return await this.prisma.shopWallet.create({
                data: {
                    paypalMethod: email,
                    SID: shopId,
                },
            });
        }
        catch (error) {
            console.log('===============ERROR==============');
            console.log(error);
            return new common_1.HttpException({ message: 'server conflict', success: false }, common_1.HttpStatus.CONFLICT);
        }
    }
};
ShopService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ShopService);
exports.ShopService = ShopService;
//# sourceMappingURL=shop.service.js.map