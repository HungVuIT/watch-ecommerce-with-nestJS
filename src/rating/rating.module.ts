import { Module } from '@nestjs/common';
import { RatingService } from './rating.service';
import { RatingController } from './rating.controller';

@Module({
    controllers: [RatingController],
    providers: [RatingService],
    exports: [RatingService],
})
export class RatingModule {}
