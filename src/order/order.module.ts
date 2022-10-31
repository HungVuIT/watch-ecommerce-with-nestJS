import { Module } from '@nestjs/common';
import { CartModule } from 'src/cart/cart.module';
import { CartService } from 'src/cart/cart.service';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';

@Module({
    providers: [OrderService],
    controllers: [OrderController],
    imports :[CartModule]
})
export class OrderModule {}
