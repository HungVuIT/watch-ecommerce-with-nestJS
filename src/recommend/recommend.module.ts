import { Module } from '@nestjs/common';
import { RecommendController } from './recommend.controller';
import { RecommendService } from './recommend.service';

@Module({
    controllers: [RecommendController],
    providers: [RecommendService],
})
export class RecommendModule {}
