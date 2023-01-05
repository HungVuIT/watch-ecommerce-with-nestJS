import { PrismaService } from 'src/prisma/prisma.service';
export declare class SharedService {
    private prisma;
    constructor(prisma: PrismaService);
    havePermisson(userId: number, itemId: number, modelName: string): Promise<boolean>;
}
