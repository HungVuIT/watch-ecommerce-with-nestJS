import { PrismaService } from 'src/prisma/prisma.service';
import { addItemDto } from './dto/addItem.dto';
export declare class FavoriteService {
    private prisma;
    constructor(prisma: PrismaService);
    getList(userId: number): Promise<(import(".prisma/client").Favorite & {
        watch: import(".prisma/client").Watch;
    })[]>;
    deleteItem(favoriteId: number): Promise<void>;
    addItem(userId: number, body: addItemDto): Promise<import(".prisma/client").Favorite>;
}
