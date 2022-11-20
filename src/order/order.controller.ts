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
    @Res() res: Response,
  ) {
    globalVariables.diliveryLocation[id] = body;

    globalVariables.paymentHost[id] =
      process.env.NODE_ENV === 'production'
        ? req.protocol + '://' + req.hostname + '/order/' + id.toString()
        : 'http://localhost:8000/order/' + id.toString();

    const url = (await this.orderService.createLinkPaymant(id)) as string;

    const result = { msg: url };

    res.status(200).send(result);

    return;
  }

  @Get(':id/success')
  success(@Param('id') id: string, @Req() req: Request) {
    globalVariables.other[id] = {
      payerId: req.query.PayerID,
      paymentId: req.query.paymentId,
    };
    return;
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
