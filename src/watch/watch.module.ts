import { Module } from '@nestjs/common';
import { RatingModule } from 'src/rating/rating.module';
import { RatingService } from 'src/rating/rating.service';
import { WatchController } from './watch.controller';
import { WatchService } from './watch.service';

@Module({
    imports: [RatingModule],
    controllers: [WatchController],
    providers: [WatchService],
})
export class WatchModule {}
