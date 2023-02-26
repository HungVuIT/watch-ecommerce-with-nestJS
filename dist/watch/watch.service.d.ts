import { PrismaService } from 'src/prisma/prisma.service';
import { RatingService } from 'src/rating/rating.service';
import { createWatchDto } from './dto/createWatch.dto';
import { updateWatchDto } from './dto/updateWatch.dto';
export declare class WatchService {
    private prisma;
    private ratingService;
    constructor(prisma: PrismaService, ratingService: RatingService);
    delete(prodcutId: number): void;
    findMany(option: any): Promise<import(".prisma/client").Watch[]>;
    findOne(watchID: number): Promise<import(".prisma/client").Watch>;
    isOwner(shopId: number, productId: number): Promise<void>;
    update(productId: number, body: updateWatchDto, imageFiles: any): Promise<import(".prisma/client").Watch>;
    create(shopId: number, body: createWatchDto, imageFiles: any): Promise<import(".prisma/client").Watch>;
    search(txt: string): Promise<import(".prisma/client").Watch[]>;
}
