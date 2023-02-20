import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SharedService {
    constructor(private prisma: PrismaService) {}

    async havePermisson(userId: number, itemId: number, modelName: string) {
        try {
            const item = await this.prisma[modelName].findUnique({
                where: { id: itemId },
            });

            if (userId === item.UID) return true;
            else return false;
        } catch (error) {
            throw new Error('check Permisson method only work with model that have UID feild');
        }
    }
}
