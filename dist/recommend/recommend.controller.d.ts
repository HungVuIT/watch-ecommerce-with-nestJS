import { RecommendService } from './recommend.service';
export declare class RecommendController {
    private service;
    constructor(service: RecommendService);
    runcode(): Promise<{
        id: number;
        Watch_rating: {
            UID: number;
            score: number;
        }[];
    }[]>;
}
