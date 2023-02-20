import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

interface Item {
    id: number;
    Watch_rating: { UID: number; score: number }[];
}

@Injectable()
export class RecommendService {
    constructor(private prisma: PrismaService) {}

    async recommend_item_list(base_item_id: number) {
        try {
            const listItem = await this.list_watch_and_rating();

            const baseItem = await this.watch_and_rating(base_item_id);

            let arr: { id: number; khoangCach: number }[] = [];

            listItem.forEach((element) => {
                const { item, recItem } = this.chuanhoa(baseItem, element);
                const tuongDong = {
                    id: element.id,
                    khoangCach: this.khoangcach(item, recItem),
                };
                arr.push(tuongDong);
            });

            arr.sort(function (a: { id: number; khoangCach: number }, b: { id: number; khoangCach: number }) {
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
        } catch (error) {
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
        } catch (error) {
            throw error;
        }
    }

    async watch_and_rating(id: number) {
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
        } catch (error) {
            throw error;
        }
    }

    chuanhoa(baseItem: Item, recItem: Item) {
        let newBitem: Item = { id: 0, Watch_rating: [] };
        let newRitem: Item = { id: 0, Watch_rating: [] };
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

    // áp dụng công thức tính độ tương đồng cosine
    khoangcach(item: Item, recItem: Item) {
        let tu: number;
        let mau1: number;
        let mau2: number;

        if (item.Watch_rating.length === 0) return 0;

        for (let index = 0; index < item.Watch_rating.length; index++) {
            tu += item.Watch_rating[index].score * recItem.Watch_rating[index].score;
            mau1 += Math.pow(item.Watch_rating[index].score, 2);
            mau2 += Math.pow(recItem.Watch_rating[index].score, 2);
        }

        return Number((tu / Math.sqrt(mau1 * mau2)).toFixed(2));
    }
}

// cur_item = [ {1,5},{3,4},{6,2}]
// item= [ {2,4},{3,5}]

// rec_list(){
//     cur_item, rec_item = chuanhoa(cur_item,rec_item)
//     tuongdong = rec_item, khoangcach(cur_item,rec_item)
//     arr[].push tuongdong

//     arr.sort
//     return arr1, arr2, arr3
// }

// chuanhoa(cur_item,rec_item){
//     for each cur_item
//         for each rec_item
//             if cur_item.id = rec_item.id
//                 new_cur_item = cur_item
//                 new_rec_item = rec_item
//     return new_cur_item, new_rec_item
// }

// khoangcach(cur_item, rec_item){
//     for each cur_item
//         tu +=cur_item.score * rec_item.score
//         mau1 += bình(cur_item.score)
//         mau2 += bình(rec_item.score)

//     return tu / (căn(mẫu1) * căn(mẫu2))
// }
