import { Module } from '@nestjs/common';
import { FavoriteController } from './favorite.controller';
import { FavoriteService } from './favorite.service';

@Module({
    providers: [FavoriteService],
    controllers: [FavoriteController],
    exports: [FavoriteService],
})
export class FavoriteModule {}
