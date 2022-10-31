import { Body, Controller, Get, Param, ParseIntPipe, Post, Req, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { User } from 'src/shared/customDecorator/user.decorator';
import { jwtGuard } from 'src/shared/guard';
import { tsRequest } from 'src/shared/requestModify/request.config';
import { createOrderDto } from './dto/createOrder.dto';
import { OrderService } from './order.service';

@UseGuards(jwtGuard)
@UseInterceptors(FileInterceptor(""))
@Controller('order')
export class OrderController {
    constructor(private orderService: OrderService){}


    @Post('/checkout')
    createOrder(@User('id') id:number, @Body() body: createOrderDto){
        return this.orderService.createOrder(id, body)
    }

    @Get('')
    getOrderList(@User('id') id:number){
        return this.orderService.getOrders(id)
    }

    @Get('/order-detail/:orderId')
    getOrderDetail(@Param('orderId', ParseIntPipe) id: number){
        return this.orderService.getOrderDetail(id)
    }
}
