import { PrismaService } from 'src/prisma/prisma.service';
import { addItemDto } from './dto/addItem.dto';
import { updateItemDto } from './dto/updateItem.dto';
export declare class CartService {
    private prisma;
    constructor(prisma: PrismaService);
    getCart(userId: number): Promise<(import(".prisma/client").Cart & {
        watch: import(".prisma/client").Watch & {
            sale_off: import(".prisma/client").Sale_off;
        };
    })[]>;
    deleteItem(cartId: number): Promise<void>;
    addItem(userId: number, body: addItemDto): Promise<import(".prisma/client").Cart>;
    updateItem(userId: number, body: updateItemDto): Promise<void>;
}
