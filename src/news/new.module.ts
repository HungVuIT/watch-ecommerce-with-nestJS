import { Module } from '@nestjs/common';
import { NewsService } from './new.service';
import { NewsController } from './new.controller';

@Module({
    controllers: [NewsController],
    providers: [NewsService],
})
export class NewsModule {}
