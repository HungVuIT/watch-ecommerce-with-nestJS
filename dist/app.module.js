"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const auth_module_1 = require("./auth/auth.module");
const brand_module_1 = require("./brand/brand.module");
const cart_module_1 = require("./cart/cart.module");
const category_module_1 = require("./category/category.module");
const comment_module_1 = require("./comment/comment.module");
const delivery_module_1 = require("./delivery/delivery.module");
const order_controller_1 = require("./order/order.controller");
const order_module_1 = require("./order/order.module");
const order_service_1 = require("./order/order.service");
const payment_module_1 = require("./payment/payment.module");
const prisma_module_1 = require("./prisma/prisma.module");
const shared_module_1 = require("./shared/shared.module");
const shop_module_1 = require("./shop/shop.module");
const user_module_1 = require("./user/user.module");
const watch_module_1 = require("./watch/watch.module");
const chat_module_1 = require("./chat/chat.module");
const mail_module_1 = require("./mail/mail.module");
const rating_module_1 = require("./rating/rating.module");
const recommend_module_1 = require("./recommend/recommend.module");
const favorite_module_1 = require("./favorite/favorite.module");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
            }),
            user_module_1.UserModule,
            prisma_module_1.PrismaModule,
            auth_module_1.AuthModule,
            shop_module_1.ShopModule,
            shared_module_1.SharedModule,
            watch_module_1.WatchModule,
            cart_module_1.CartModule,
            order_module_1.OrderModule,
            category_module_1.CategoryModule,
            brand_module_1.BrandModule,
            comment_module_1.CommentModule,
            payment_module_1.PaymentModule,
            delivery_module_1.DeliveryModule,
            chat_module_1.ChatModule,
            mail_module_1.MailModule,
            rating_module_1.RatingModule,
            recommend_module_1.RecommendModule,
            favorite_module_1.FavoriteModule,
        ],
        controllers: [app_controller_1.AppController, order_controller_1.OrderController],
        providers: [app_service_1.AppService, order_service_1.OrderService],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map