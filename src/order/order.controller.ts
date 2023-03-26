import { Body, Controller, Get, Param, ParseIntPipe, Post, Req, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Request } from 'express';
import { User } from 'src/shared/customDecorator/user.decorator';
import { globalVariables } from 'src/shared/global.service';
import { jwtGuard } from 'src/shared/guard';
import { TransResInterceptor } from 'src/shared/interceptor/res.interceptor';
import { createOrderDto } from './dto/createOrder.dto';
import { OrderService } from './order.service';

@Controller('order')
@UseInterceptors(TransResInterceptor)
export class OrderController {
    constructor(private orderService: OrderService) {}

    @UseGuards(jwtGuard)
    @UseInterceptors(FileInterceptor(''))
    @Post('/checkout')
    async createOrder(@User('id') id: number, @Body() body: createOrderDto, @Req() req: Request) {
        globalVariables.deliveryLocation[id] = {
            address: body.address,
            deliveryOption: body.deliveryOption,
            district: body.district,
            province: body.province,
            ward: body.ward,
        };

        globalVariables.paymentHost[id] =
            process.env.NODE_ENV === 'production'
                ? 'https://dhwatch.onrender.com/api/order/' + id.toString()
                : 'http://localhost:8000/api/order/' + id.toString();

        if (body.paymentMethod === 'offline') {
            const order = await this.orderService.cashOnDelivery(id);

            return order;
        }
        
        const order = await this.orderService.createLinkPaymant(id);

        return order;
    }

    @Get(':id/success')
    success(@Param('id', ParseIntPipe) id: number, @Req() req: Request) {
        globalVariables.other[id] = {
            payerId: req.query.PayerID,
            paymentId: req.query.paymentId,
        };
        return this.orderService.completeOrder(id);
    }

    @UseGuards(jwtGuard)
    @Get('')
    getOrderList(@User('id') id: number) {
        return this.orderService.getOrders(id);
    }

    @UseGuards(jwtGuard)
    @Get('/order-detail/:orderId')
    getOrderDetail(@Param('orderId', ParseIntPipe) id: number) {
        return this.orderService.getOrderDetail(id);
    }
}
