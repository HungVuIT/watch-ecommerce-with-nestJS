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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let UserService = class UserService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async editMe(id, body, file) {
        try {
            if (file) {
                body.avatar = file.path;
            }
            const user = await this.prisma.user.update({
                where: { id: id },
                data: body,
            });
            delete user['password'];
            return user;
        }
        catch (error) {
            throw error;
        }
    }
    async getUserById(id) {
        try {
            const user = await this.prisma.user.findUnique({
                where: { id: id },
            });
            delete user['password'];
            return user;
        }
        catch (error) {
            throw error;
        }
    }
    async delete(id) {
        try {
            await this.prisma.user.update({
                where: { id: id },
                data: { isActive: false }
            });
        }
        catch (error) {
            throw error;
        }
    }
    async getList(option) {
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
            const list = await this.prisma.user.findMany(query);
            return list;
        }
        catch (error) {
            throw error;
        }
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map