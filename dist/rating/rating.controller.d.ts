import { HttpStatus } from '@nestjs/common/enums';
import { RatingService } from './rating.service';
export declare class rateBody {
    targetID: number;
    score: number;
    content: string;
}
export declare class RatingController {
    private ratingService;
    constructor(ratingService: RatingService);
    rateShop(userID: number, body: rateBody): HttpStatus;
    updateRateShop(userID: number, body: rateBody): HttpStatus;
    getRateShop(id: number): Promise<{
        score: number;
        list: (import(".prisma/client").Shop_rating & {
            user: import(".prisma/client").User;
        })[];
    }>;
    rateWatch(userID: number, body: rateBody): HttpStatus;
    updateRateWatch(userID: number, body: rateBody): HttpStatus;
    getRateWatch(id: number): Promise<{
        score: number;
        list: (import(".prisma/client").Watch_rating & {
            user: import(".prisma/client").User;
        })[];
    }>;
}
