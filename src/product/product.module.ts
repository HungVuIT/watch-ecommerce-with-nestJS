import { Module } from '@nestjs/common';
import { RatingModule } from 'src/rating/rating.module';
import { RatingService } from 'src/rating/rating.service';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';

@Module({
    imports: [RatingModule],
    controllers: [ProductController],
    providers: [ProductService],
})
export class ProductModule {}
