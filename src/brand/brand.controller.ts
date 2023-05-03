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
import { BrandService } from './brand.service';
import { createBrandDto } from './dto/createBrand.dto';
import { editBrandDto } from './dto/editBrand.dto';

@UseInterceptors(TransResInterceptor)
@Controller('brands')
export class BrandController {
    constructor(private service: BrandService) {}

    @UseInterceptors(fileUpload('image'))
    @UseGuards(jwtGuard, AdminGuard)
    @Post()
    createBrand(@Body() body: createBrandDto, @UploadedFile() file: Express.Multer.File) {
        return this.service.createBrand(body, file);
    }

    @UseGuards(jwtGuard, AdminGuard)
    @Patch('id/:id')
    editBrand(
        @Param('id', ParseIntPipe) id: number,
        @Body() body: editBrandDto,
        @UploadedFile() file: Express.Multer.File
    ) {
        return this.service.editBrand(id, body, file);
    }

    @Get('list')
    getList() {
        return this.service.getList();
    }

    @Get('id/:id')
    getById(@Param('id', ParseIntPipe) id: number) {
        return this.service.getById(id);
    }

    @Delete('id/:id')
    delete(@Param('id', ParseIntPipe) id: number) {
        return this.service.delete(id);
    }
}
