import { PrismaService } from 'src/prisma/prisma.service';
interface Item {
    id: number;
    Watch_rating: {
        UID: number;
        score: number;
    }[];
}
export declare class RecommendService {
    private prisma;
    constructor(prisma: PrismaService);
    recommend_item_list(base_item_id: number): Promise<void>;
    list_watch_and_rating(): Promise<{
        id: number;
        Watch_rating: {
            UID: number;
            score: number;
        }[];
    }[]>;
    watch_and_rating(id: number): Promise<{
        id: number;
        Watch_rating: {
            UID: number;
            score: number;
        }[];
    }>;
    chuanhoa(baseItem: Item, recItem: Item): {
        item: Item;
        recItem: Item;
    };
    khoangcach(item: Item, recItem: Item): number;
}
export {};
