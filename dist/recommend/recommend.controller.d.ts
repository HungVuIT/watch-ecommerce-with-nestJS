import { RecommendService } from './recommend.service';
export declare class RecommendController {
    private service;
    constructor(service: RecommendService);
    runcode(id: number): Promise<(import("@prisma/client/runtime").GetResult<{
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
}
