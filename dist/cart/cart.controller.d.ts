import { CartService } from './cart.service';
import { addItemDto } from './dto/addItem.dto';
import { updateItemDto } from './dto/updateItem.dto';
export declare class CartController {
    private cartService;
    constructor(cartService: CartService);
    addItem(userId: number, body: addItemDto): Promise<import(".prisma/client").Cart>;
    changeOption(userId: number, body: updateItemDto): Promise<void>;
    removeItem(id: number): Promise<void>;
    getCart(userId: number): Promise<(import(".prisma/client").Cart & {
        watch: import(".prisma/client").Watch;
    })[]>;
}
