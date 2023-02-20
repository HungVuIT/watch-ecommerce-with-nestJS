import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { RecommendService } from './recommend.service';

@Controller('recommend')
export class RecommendController {
    constructor(private service: RecommendService) {}

    @Get('/:id')
    runcode(@Param('id', ParseIntPipe) id: number) {
        return this.service.recommend_item_list(id);
    }
}
