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
import { CategoryService } from './category.service';
import { createCategoryDto } from './dto/createCategory.dto';
import { editCategoryDto } from './dto/editCategory.dto';

@UseInterceptors(TransResInterceptor)
@Controller('categorys')
export class CategoryController {
    constructor(private service: CategoryService) {}

    @UseInterceptors(fileUpload('image'))
    @UseGuards(jwtGuard, AdminGuard)
    @Post()
    createCategory(@Body() body: createCategoryDto, @UploadedFile() file: Express.Multer.File) {
        return this.service.createCategory(body, file);
    }

    @UseInterceptors(fileUpload('image'))
    @UseGuards(jwtGuard, AdminGuard)
    @Patch('id/:id')
    editCategory(
        @Param('id', ParseIntPipe) id: number,
        @Body() body: editCategoryDto,
        @UploadedFile() file: Express.Multer.File
    ) {
        return this.service.editCategory(id, body, file);
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
