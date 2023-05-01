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
exports.NewsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let NewsService = class NewsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getById(NewId) {
        try {
            return await this.prisma.news.findUnique({
                where: {
                    id: NewId,
                },
            });
        }
        catch (error) {
            throw error;
        }
    }
    async getList() {
        try {
            return await this.prisma.news.findMany({});
        }
        catch (error) {
            throw error;
        }
    }
    async editNew(newId, body) {
        try {
            return await this.prisma.news.update({
                where: { id: newId },
                data: body,
            });
        }
        catch (error) {
            throw error;
        }
    }
    async createNew(body) {
        try {
            return await this.prisma.news.create({
                data: body,
            });
        }
        catch (error) {
            throw error;
        }
    }
};
NewsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], NewsService);
exports.NewsService = NewsService;
//# sourceMappingURL=new.service.js.map