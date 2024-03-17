import { PrismaService } from 'src/prisma/prisma.service';
import { addItemDto } from './dto/addItem.dto';
export declare class FavoriteService {
    private prisma;
    constructor(prisma: PrismaService);
    getList(userId: number): Promise<({
        product: import("@prisma/client/runtime").GetResult<{
            id: number;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            BID: number;
            SID: number;
            CID: number;
            sku: string;
            description: string;
            content: string;
            isHome: boolean;
            saled: number;
            quantity: number;
            price: number;
            estimatedPrice: number;
            image: string[];
            isActive: boolean;
        }, unknown, never> & {};
    } & import("@prisma/client/runtime").GetResult<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        UID: number;
        PID: number;
        isActive: boolean;
    }, unknown, never> & {})[]>;
    deleteItem(favoriteId: number): Promise<void>;
    addItem(userId: number, body: addItemDto): Promise<import("@prisma/client/runtime").GetResult<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        UID: number;
        PID: number;
        isActive: boolean;
    }, unknown, never> & {}>;
}
