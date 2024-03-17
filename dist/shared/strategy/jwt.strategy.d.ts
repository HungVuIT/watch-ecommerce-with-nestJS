import { ConfigService } from '@nestjs/config';
import { Strategy } from 'passport-jwt';
import { PrismaService } from 'src/prisma/prisma.service';
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    private prisma;
    constructor(prisma: PrismaService, config: ConfigService);
    validate(payload: {
        id: string;
        username: string;
    }): Promise<import("@prisma/client/runtime").GetResult<{
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
    }, unknown, never> & {}>;
}
export {};
