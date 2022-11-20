import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { ShopModule } from './shop/shop.module';
import { SharedModule } from './shared/shared.module';
import { WatchModule } from './watch/watch.module';
import { CartModule } from './cart/cart.module';
import { OrderController } from './order/order.controller';
import { OrderService } from './order/order.service';
import { OrderModule } from './order/order.module';
import { CategoryModule } from './category/category.module';
import { BrandModule } from './brand/brand.module';
import { CommentModule } from './comment/comment.module';
import { PaymentModule } from './payment/payment.module';
import { DeliveryModule } from './delivery/delivery.module';

@Module({
  imports: [
    
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UserModule,
    PrismaModule,
    AuthModule,
    ShopModule,
    SharedModule,
    WatchModule,
    CartModule,
    OrderModule,
    CategoryModule,
    BrandModule,
    CommentModule,
    PaymentModule,
    DeliveryModule
  ],
  controllers: [AppController, OrderController],
  providers: [AppService, OrderService],
})
export class AppModule {}
