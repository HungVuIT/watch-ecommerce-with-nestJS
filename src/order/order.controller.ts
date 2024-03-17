import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Patch,
    Post,
    Req,
    Res,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Request } from 'express';
import { User } from 'src/shared/customDecorator/user.decorator';
import { globalVariables } from 'src/shared/global.service';
import { AdminGuard, VendorGuard, jwtGuard } from 'src/shared/guard';
import { TransResInterceptor } from 'src/shared/interceptor/res.interceptor';
import { createOrderDto } from './dto/createOrder.dto';
import { OrderService } from './order.service';
import { DeliveryService } from 'src/delivery/delivery.service';
import { Shop } from 'src/shared/customDecorator/shop.decorator';

@Controller('order')
@UseInterceptors(TransResInterceptor)
export class OrderController {
    constructor(private orderService: OrderService, private glo: globalVariables) {}

    // @UseGuards(jwtGuard)
    // @UseInterceptors(FileInterceptor(''))
    // @Post('/checkout')
    // async createOrder(@User('id') id: number, @Body() body: createOrderDto, @Req() req: Request) {
    //     globalVariables.deliveryLocation[id] = {
    //         address: body.address,
    //         deliveryOption: body.deliveryOption,
    //         district: body.district,
    //         province: body.province,
    //         ward: body.ward,
    //     };

    //     globalVariables.paymentHost[id] =
    //         process.env.NODE_ENV === 'production'
    //             ? 'https://dhwatch.onrender.com/api/order/' + id.toString()
    //             : 'http://localhost:8000/api/order/' + id.toString();

    //     if (body.paymentMethod === 'offline') {
    //         const order = await this.orderService.cashOnDelivery(id);

    //         return order;
    //     }

    //     const order = await this.orderService.createLinkPaymant(id);

    //     return order;
    // }

    // @Get(':id/success')
    // async success(@Param('id', ParseIntPipe) id: number, @Req() req: Request, @Res() res: any) {
    //     globalVariables.other[id] = {
    //         payerId: req.query.PayerID,
    //         paymentId: req.query.paymentId,
    //     };
    //     const order = await this.orderService.completeOrder(id);

    //     return res.redirect(`https://main--dh-product-bku.netlify.app/`);
    // }

    @UseGuards(jwtGuard)
    @Get('/user')
    getOrderListUser(@User('id') id: number) {
        return this.orderService.getOrdersUser(id);
    }

    @UseGuards(jwtGuard)
    @Get('/admin')
    getOrderListAdmin() {
        return this.orderService.getOrdersAdmin();
    }

    @UseGuards(jwtGuard, VendorGuard)
    @Get('/shop')
    getOrderListShop(@Shop('id') id: number) {
        return this.orderService.getOrdersShop(id);
    }

    @UseGuards(jwtGuard)
    @Get('/order-detail/:orderId')
    getOrderDetail(@Param('orderId', ParseIntPipe) id: number) {
        return this.orderService.getOrderDetail(id);
    }

    @UseGuards(jwtGuard)
    @Patch('/id/:id')
    updateOrder(@Param('id', ParseIntPipe) id: number, @Body() body: any) {
        return this.orderService.updateOrder(id, body);
    }

    @UseGuards(jwtGuard, AdminGuard)
    @Delete('/id/:id')
    deleteOrder(@Param('id', ParseIntPipe) id: number) {
        return this.orderService.deleteOrder(id);
    }

    // @UseGuards(jwtGuard, AdminGuard)
    // @Get('/pay-vendor/:id')
    // payForVendor(@Param('id', ParseIntPipe) id: number) {
    //     return this.orderService.payForOrder(id);
    // }

    // @UseGuards(jwtGuard)
    // @UseInterceptors(FileInterceptor(''))
    // @Post('/ship-fee')
    // async getShipFee(@User('id') id: number, @Body() body: createOrderDto) {
    //     globalVariables.deliveryLocation[id] = {
    //         address: body.address,
    //         deliveryOption: body.deliveryOption,
    //         district: body.district,
    //         province: body.province,
    //         ward: body.ward,
    //     };
    //     const Fee = await this.orderService.getDeliveryFree(id);

    //     this.glo.deleteUserInfor(id);

    //     return Fee;
    // }
}
