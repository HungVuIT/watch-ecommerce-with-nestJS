import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { BrandModule } from './brand/brand.module';
import { CartModule } from './cart/cart.module';
import { CategoryModule } from './category/category.module';
import { CommentModule } from './comment/comment.module';
import { DeliveryModule } from './delivery/delivery.module';
import { OrderController } from './order/order.controller';
import { OrderModule } from './order/order.module';
import { OrderService } from './order/order.service';
import { PaymentModule } from './payment/payment.module';
import { PrismaModule } from './prisma/prisma.module';
import { SharedModule } from './shared/shared.module';
import { ShopModule } from './shop/shop.module';
import { UserModule } from './shop/user/user.module';
import { ChatModule } from './chat/chat.module';
import { MailModule } from './mail/mail.module';
import { RatingModule } from './rating/rating.module';
import { FavoriteModule } from './favorite/favorite.module';
import { SaleOffModule } from './sale-off/sale-off.module';
import { NewsModule } from './news/new.module';
import { ProductModule } from './product/product.module';
import { RecommendService } from './recommend/recommend.service';
import { RecommendModule } from './recommend/recommend.module';

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
        ProductModule,
        CartModule,
        OrderModule,
        CategoryModule,
        BrandModule,
        CommentModule,
        PaymentModule,
        DeliveryModule,
        ChatModule,
        MailModule,
        RatingModule,
        RecommendModule,
        FavoriteModule,
        SaleOffModule,
        NewsModule,
    ],
    controllers: [AppController, OrderController],
    providers: [AppService, OrderService],
})
export class AppModule {}
