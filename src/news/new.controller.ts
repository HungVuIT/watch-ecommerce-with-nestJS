import {
    Body,
    Controller,
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
import { NewsService } from './new.service';
import { createNewDto } from './dto/createNew.dto';
import { editNewDto } from './dto/editNew.dto';

@UseInterceptors(TransResInterceptor)
@Controller('news')
export class NewsController {
    constructor(private service: NewsService) {}

    @UseInterceptors(fileUpload('image'))
    @UseGuards(jwtGuard, AdminGuard)
    @Post()
    createNew(@Body() body: createNewDto) {
        return this.service.createNew(body);
    }

    @UseInterceptors(fileUpload('image'))
    @UseGuards(jwtGuard, AdminGuard)
    @Patch('id/:id')
    editNew(
        @Param('id', ParseIntPipe) id: number,
        @Body() body: editNewDto,
    ) {
        return this.service.editNew(id, body);
    }

    @Get('list')
    getList() {
        return this.service.getList();
    }

    @Get('id/:id')
    getById(@Param('id', ParseIntPipe) id: number) {
        return this.service.getById(id);
    }
}
