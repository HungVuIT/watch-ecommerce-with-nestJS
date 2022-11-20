import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  Req,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Request } from 'express';
import { fileFieldsUpload, fileUpload } from 'src/shared/cloudinary/storage';
import { Shop } from 'src/shared/customDecorator/shop.decorator';
import { User } from 'src/shared/customDecorator/user.decorator';
import { jwtGuard, VendorGuard } from 'src/shared/guard';
import { AddressPipe } from 'src/shared/pipe/addressValidation.pipe';
import { createShopDto } from './dto/createShop.dto';
import { ShopService } from './shop.service';

@Controller('shops')
export class ShopController {
  constructor(private shopService: ShopService) {}

  @UseGuards(jwtGuard)
  @UseInterceptors(FileInterceptor(''))
  @Post('my-shop')
  createShop(@User('id') id: number, @Body(new AddressPipe()) body: createShopDto) {
    return this.shopService.create(id, body);
  }

  @UseGuards(jwtGuard, VendorGuard)
  @UseInterceptors(
    fileFieldsUpload([
      { name: 'logo', maxCount: 1 },
      { name: 'banner', maxCount: 1 },
    ]),
  )
  @Patch('my-shop')
  updateShop(
    @User('id') id: number,
    @Body(new AddressPipe()) body,
    @UploadedFiles()
    files: {
      logo?: Express.Multer.File[];
      banner?: Express.Multer.File[];
    },
  ) {
    return this.shopService.updateByUserId(id, body, files);
  }

  @UseGuards(jwtGuard, VendorGuard)
  @Delete('my-shop')
  deleteShop(@User('id') id: number) {
    return this.shopService.deleteByUserId(id);
  }

  @Get('list')
  listShop(@Query() query) {
    return this.shopService.findMany(query);
  }

  @Get('id/:id')
  getShopById(@Param('id', ParseIntPipe) id: number) {
    return this.shopService.findById(Number(id));
  }

  @UseGuards(jwtGuard, VendorGuard)
  @Get('me')
  myShop() {
    return this.shopService.myShop();
  }

  @UseGuards(jwtGuard, VendorGuard)
  @UseInterceptors(FileInterceptor(''))
  @Post('add-payment-method')
  addPayment(@Shop('id') id: number, @Body() body){
    return this.shopService.addPayment(id, body.email);
  }
}
