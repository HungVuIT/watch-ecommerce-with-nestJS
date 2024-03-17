import { ConfigService } from '@nestjs/config';
import { PrismaService } from 'src/prisma/prisma.service';
import { rateBody } from './rating.controller';
export declare class RatingService {
    private prisma;
    constructor(config: ConfigService, prisma: PrismaService);
    rateProduct(userID: number, body: rateBody): Promise<void>;
    updateRateProduct(userID: number, body: rateBody): Promise<void>;
    rateShop(userID: number, body: rateBody): Promise<void>;
    updateRateShop(userID: number, body: rateBody): Promise<void>;
    getShopRate(shopID: number): Promise<{
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
    getProductRate(productID: number): Promise<{
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
