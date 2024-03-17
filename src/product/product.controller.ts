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
    UploadedFile,
    UploadedFiles,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common';
import { filesUpload } from 'src/shared/cloudinary/storage';
import { jwtGuard, VendorGuard } from 'src/shared/guard';
import { TransResInterceptor } from 'src/shared/interceptor/res.interceptor';
import { tsRequest } from 'src/shared/requestModify/request.config';
import { createProductDto } from './dto/createProduct.dto';
import { updateProductDto } from './dto/updateProduct.dto';
import { ProductService } from './product.service';

@UseInterceptors(TransResInterceptor)
@Controller('products')
export class ProductController {
    constructor(private productService: ProductService) {}

    @UseGuards(jwtGuard, VendorGuard)
    @UseInterceptors(filesUpload('image', 8))
    @Post('/new')
    createProduct(
        @Req() req: tsRequest,
        @Body() body: createProductDto,
        @UploadedFiles() file: Array<Express.Multer.File>
    ) {
        return this.productService.create(req.shop['id'], body, file);
    }

    @UseGuards(jwtGuard, VendorGuard)
    @UseInterceptors(filesUpload('image', 8))
    @Patch('/id/:id')
    editProduct(
        @Param('id', ParseIntPipe) id: number,
        @Req() req: tsRequest,
        @Body() body: updateProductDto,
        @UploadedFile() file: Array<Express.Multer.File>
    ) {
        return this.productService.update(id, body, file);
    }

    @Get('/list')
    getList(@Query() query) {
        return this.productService.findMany(query);
    }

    @UseGuards(jwtGuard,VendorGuard)
    @Delete('/id/:id')
    deleteProduct(@Param('id', ParseIntPipe) id: number) {
        return this.productService.delete(id);
    }

    @Get('id/:id')
    getProduct(@Param('id', ParseIntPipe) id: number) {
        return this.productService.findOne(id);
    }

    @Get('search/:value')
    search(@Param('value') searchTxt: string) {
        return this.productService.search(searchTxt);
    }
}
