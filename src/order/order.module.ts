import { Module } from '@nestjs/common';
import { CartModule } from 'src/cart/cart.module';
import { CartService } from 'src/cart/cart.service';
import { DeliveryModule } from 'src/delivery/delivery.module';
import { PaymentModule } from 'src/payment/payment.module';
import { PaymentService } from 'src/payment/payment.service';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';

@Module({
    providers: [OrderService],
    controllers: [OrderController],
    imports :[CartModule, PaymentModule, DeliveryModule]
})
export class OrderModule {}
