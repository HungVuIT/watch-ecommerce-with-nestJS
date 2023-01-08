import { RecommendService } from './recommend.service';
export declare class RecommendController {
    private service;
    constructor(service: RecommendService);
    runcode(id: number): Promise<import(".prisma/client").Watch[]>;
}
