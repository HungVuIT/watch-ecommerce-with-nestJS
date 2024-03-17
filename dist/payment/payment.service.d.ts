import { ConfigService } from '@nestjs/config';
import { PrismaService } from 'src/prisma/prisma.service';
export declare class PaymentService {
    private config;
    private prisma;
    constructor(config: ConfigService, prisma: PrismaService);
}
