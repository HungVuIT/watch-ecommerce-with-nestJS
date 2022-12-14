import { HttpStatus } from '@nestjs/common/enums';
import { RatingService } from './rating.service';
declare class rateBody {
    targetID: number;
    score: number;
}
export declare class RatingController {
    private ratingService;
    constructor(ratingService: RatingService);
    rateShop(userID: number, body: rateBody): HttpStatus;
    updateRateShop(userID: number, body: rateBody): HttpStatus;
    getRateShop(id: number): Promise<number>;
    rateWatch(userID: number, body: rateBody): HttpStatus;
    updateRateWatch(userID: number, body: rateBody): HttpStatus;
    getRateWatch(id: number): Promise<number>;
}
export {};
