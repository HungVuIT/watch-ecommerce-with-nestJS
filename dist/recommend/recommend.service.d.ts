import { PrismaService } from 'src/prisma/prisma.service';
interface Item {
    id: number;
    Product_rating: {
        UID: number;
        score: number;
    }[];
}
export declare class RecommendService {
    private prisma;
    constructor(prisma: PrismaService);
    recommend_item_list(base_item_id: number): Promise<(import("@prisma/client/runtime").GetResult<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        BID: number;
        SID: number;
        CID: number;
        sku: string;
        description: string;
        content: string;
        isHome: boolean;
        saled: number;
        quantity: number;
        price: number;
        estimatedPrice: number;
        image: string[];
        isActive: boolean;
    }, unknown, never> & {})[]>;
    list_watch_and_rating(): Promise<{
        id: number;
        Product_rating: {
            UID: number;
            score: number;
        }[];
    }[]>;
    watch_and_rating(id: number): Promise<{
        id: number;
        Product_rating: {
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
