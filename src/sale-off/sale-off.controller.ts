import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Patch,
    Post,
    UploadedFile,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common';
import { fileUpload } from 'src/shared/cloudinary/storage';
import { AdminGuard, jwtGuard } from 'src/shared/guard';
import { TransResInterceptor } from 'src/shared/interceptor/res.interceptor';
import { SaleOffService } from './sale-off.service';
import { createSaleOffDto } from './dto/createSaleOff.dto';
import { editSaleOffDto } from './dto/editSaleOff.dto';

@UseInterceptors(TransResInterceptor)
@Controller('saleOff')
export class SaleOffController {
    constructor(private service: SaleOffService) {}

    @UseInterceptors(fileUpload('image'))
    @UseGuards(jwtGuard)
    @Post()
    createSaleOff(@Body() body: createSaleOffDto) {
        return this.service.createSaleOff(body);
    }

    @UseGuards(jwtGuard)
    @Patch('')
    editSaleOff(
        @Body() body: editSaleOffDto,
    ) {
        return this.service.editSaleOff(body);
    }

    @Delete('id/:id')
    delete(@Param('id', ParseIntPipe) id: number) {
        return this.service.delete(id);
    }
}
