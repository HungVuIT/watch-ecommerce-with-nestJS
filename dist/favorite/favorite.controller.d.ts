import { FavoriteService } from './favorite.service';
import { addItemDto } from './dto/addItem.dto';
export declare class FavoriteController {
    private favoriteService;
    constructor(favoriteService: FavoriteService);
    addItem(userId: number, body: addItemDto): Promise<import("@prisma/client/runtime").GetResult<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        UID: number;
        PID: number;
        isActive: boolean;
    }, unknown, never> & {}>;
    removeItem(id: number): Promise<void>;
    getFavorite(userId: number): Promise<({
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
}
