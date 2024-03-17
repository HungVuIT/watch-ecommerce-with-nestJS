import { PrismaService } from 'src/prisma/prisma.service';
import { addItemDto } from './dto/addItem.dto';
import { updateItemDto } from './dto/updateItem.dto';
export declare class CartService {
    private prisma;
    constructor(prisma: PrismaService);
    getCart(userId: number): Promise<({
        product: {
            sale_off: import("@prisma/client/runtime").GetResult<{
                id: number;
                createdAt: Date;
                updatedAt: Date;
                amount: number;
                quantity: number;
                start: Date;
                end: Date;
                PID: number;
            }, unknown, never> & {};
        } & import("@prisma/client/runtime").GetResult<{
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
        quantity: number;
        isActive: boolean;
    }, unknown, never> & {})[]>;
    deleteItem(cartId: number): Promise<void>;
    addItem(userId: number, body: addItemDto): Promise<import("@prisma/client/runtime").GetResult<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        UID: number;
        PID: number;
        quantity: number;
        isActive: boolean;
    }, unknown, never> & {}>;
    updateItem(userId: number, body: updateItemDto): Promise<void>;
}
