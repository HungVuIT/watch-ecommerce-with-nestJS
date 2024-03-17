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
        list: ({
            user: import("@prisma/client/runtime").GetResult<{
                id: number;
                createdAt: Date;
                updatedAt: Date;
                username: string;
                password: string;
                email: string;
                phoneNumber: string;
                firstName: string;
                lastName: string;
                province: string;
                district: string;
                ward: string;
                address: string;
                gender: import(".prisma/client").Gender;
                birthDay: Date;
                avatar: string;
                status: boolean;
                role: import(".prisma/client").Role;
                isActive: boolean;
            }, unknown, never> & {};
        } & import("@prisma/client/runtime").GetResult<{
            id: number;
            createdAt: Date;
            updatedAt: Date;
            UID: number;
            SID: number;
            score: number;
            content: string;
        }, unknown, never> & {})[];
    }>;
    rateWatch(userID: number, body: rateBody): HttpStatus;
    updateRateWatch(userID: number, body: rateBody): HttpStatus;
    getRateWatch(id: number): Promise<{
        score: number;
        list: ({
            user: import("@prisma/client/runtime").GetResult<{
                id: number;
                createdAt: Date;
                updatedAt: Date;
                username: string;
                password: string;
                email: string;
                phoneNumber: string;
                firstName: string;
                lastName: string;
                province: string;
                district: string;
                ward: string;
                address: string;
                gender: import(".prisma/client").Gender;
                birthDay: Date;
                avatar: string;
                status: boolean;
                role: import(".prisma/client").Role;
                isActive: boolean;
            }, unknown, never> & {};
        } & import("@prisma/client/runtime").GetResult<{
            id: number;
            createdAt: Date;
            updatedAt: Date;
            UID: number;
            PID: number;
            score: number;
            content: string;
        }, unknown, never> & {})[];
    }>;
}
