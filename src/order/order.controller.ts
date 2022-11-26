import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Req,
  Res,
  Session,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Request, Response } from 'express';
import { User } from 'src/shared/customDecorator/user.decorator';
import { globalVariables } from 'src/shared/global.service';
import { jwtGuard } from 'src/shared/guard';
import { tsRequest } from 'src/shared/requestModify/request.config';
import { createOrderDto } from './dto/createOrder.dto';
import { OrderService } from './order.service';

@Controller('order')
export class OrderController {
  constructor(private orderService: OrderService) {}

  @UseGuards(jwtGuard)
  @UseInterceptors(FileInterceptor(''))
  @Post('/checkout')
  async createOrder(
    @User('id') id: number,
    @Body() body: createOrderDto,
    @Req() req: Request,
  ) {
    globalVariables.diliveryLocation[id] = {
      address: body.address,
      deliveryOption: body.deliveryOption,
      district: body.district,
      province: body.province,
      ward: body.ward,
    };

    globalVariables.paymentHost[id] =
      process.env.NODE_ENV === 'production'
        ? req.protocol + '://' + req.hostname + '/api/order/' + id.toString()
        : 'http://localhost:8000/api/order/' + id.toString();

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
