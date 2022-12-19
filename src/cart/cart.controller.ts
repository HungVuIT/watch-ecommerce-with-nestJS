import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { User } from 'src/shared/customDecorator/user.decorator';
import { jwtGuard } from 'src/shared/guard';
import { TransResInterceptor } from 'src/shared/res.interceptor';
import { CartService } from './cart.service';
import { addItemDto } from './dto/addItem.dto';
import { updateItemDto } from './dto/updateItem.dto';

@Controller('cart')
@UseInterceptors(FileInterceptor(''))
@UseInterceptors(TransResInterceptor)
export class CartController {
  constructor(private cartService: CartService) {}

  @UseGuards(jwtGuard)
  @Post('item')
  addItem(@User('id') userId: number, @Body() body: addItemDto) {
    return this.cartService.addItem(userId, body);
  }

  @UseGuards(jwtGuard)
  @Patch('item')
  changeOption(@User('id') userId: number, @Body() body: updateItemDto) {
    return this.cartService.updateItem(userId, body);
  }

  @UseGuards(jwtGuard)
  @Delete('item/:cartId')
  removeItem(@Param('cartId', ParseIntPipe) id: number) {
    return this.cartService.deleteItem(id);
  }

  @UseGuards(jwtGuard)
  @Get('')
  getCart(@User('id') userId: number) {
    return this.cartService.getCart(userId);
  }
}
