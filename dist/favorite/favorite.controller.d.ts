import { FavoriteService } from './favorite.service';
import { addItemDto } from './dto/addItem.dto';
export declare class FavoriteController {
    private favoriteService;
    constructor(favoriteService: FavoriteService);
    addItem(userId: number, body: addItemDto): Promise<import(".prisma/client").Favorite>;
    removeItem(id: number): Promise<void>;
    getFavorite(userId: number): Promise<(import(".prisma/client").Favorite & {
        watch: import(".prisma/client").Watch;
    })[]>;
}
