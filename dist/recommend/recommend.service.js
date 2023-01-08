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
exports.RecommendService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let RecommendService = class RecommendService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async recommend_item_list(base_item_id) {
        try {
            const listItem = await this.list_watch_and_rating();
            const baseItem = await this.watch_and_rating(base_item_id);
            let arr = [];
            listItem.forEach((element) => {
                const { item, recItem } = this.chuanhoa(baseItem, element);
                const tuongDong = {
                    id: element.id,
                    khoangCach: this.khoangcach(item, recItem),
                };
                arr.push(tuongDong);
            });
            arr.sort(function (a, b) {
                return b.khoangCach - a.khoangCach;
            });
            const item1 = await this.prisma.watch.findUnique({
                where: {
                    id: arr[0].id,
                },
            });
            const item2 = await this.prisma.watch.findUnique({
                where: {
                    id: arr[1].id,
                },
            });
            const item3 = await this.prisma.watch.findUnique({
                where: {
                    id: arr[2].id,
                },
            });
            const item4 = await this.prisma.watch.findUnique({
                where: {
                    id: arr[3].id,
                },
            });
            return [item1, item2, item3, item4];
        }
        catch (error) {
            console.log(error);
            throw error;
        }
    }
    async list_watch_and_rating() {
        try {
            return await this.prisma.watch.findMany({
                select: {
                    id: true,
                    Watch_rating: {
                        select: {
                            UID: true,
                            score: true,
                        },
                    },
                },
                orderBy: {
                    saled: 'desc',
                },
                take: 300,
            });
        }
        catch (error) {
            throw error;
        }
    }
    async watch_and_rating(id) {
        try {
            return await this.prisma.watch.findUnique({
                where: {
                    id: id,
                },
                select: {
                    id: true,
                    Watch_rating: {
                        select: {
                            UID: true,
                            score: true,
                        },
                    },
                },
            });
        }
        catch (error) {
            throw error;
        }
    }
    chuanhoa(baseItem, recItem) {
        let newBitem = { id: 0, Watch_rating: [] };
        let newRitem = { id: 0, Watch_rating: [] };
        newBitem.id = baseItem.id;
        newRitem.id = recItem.id;
        baseItem.Watch_rating.forEach((rating) => {
            recItem.Watch_rating.forEach((rating2) => {
                if (rating.UID === rating2.UID) {
                    newBitem.Watch_rating.push(rating);
                    newRitem.Watch_rating.push(rating2);
                }
            });
        });
        return {
            item: newBitem,
            recItem: newRitem,
        };
    }
    khoangcach(item, recItem) {
        let tu;
        let mau1;
        let mau2;
        if (item.Watch_rating.length === 0)
            return 0;
        for (let index = 0; index < item.Watch_rating.length; index++) {
            tu += item.Watch_rating[index].score * recItem.Watch_rating[index].score;
            mau1 += Math.pow(item.Watch_rating[index].score, 2);
            mau2 += Math.pow(recItem.Watch_rating[index].score, 2);
        }
        return Number((tu / Math.sqrt(mau1 * mau2)).toFixed(2));
    }
};
RecommendService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], RecommendService);
exports.RecommendService = RecommendService;
//# sourceMappingURL=recommend.service.js.map