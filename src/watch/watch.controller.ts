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
import { TransResInterceptor } from 'src/shared/res.interceptor';
import { tsRequest } from 'src/shared/requestModify/request.config';
import { createWatchDto } from './dto/createWatch.dto';
import { updateWatchDto } from './dto/updateWatch.dto';
import { WatchService } from './watch.service';

@UseInterceptors(TransResInterceptor)
@Controller('watchs')
export class WatchController {
  constructor(private watchService: WatchService) {}

  @UseGuards(jwtGuard, VendorGuard)
  @UseInterceptors(filesUpload('image', 8))
  @Post('/new')
  createWatch(
    @Req() req: tsRequest,
    @Body() body: createWatchDto,
    @UploadedFiles() file: Array<Express.Multer.File>,
  ) {
    return this.watchService.create(req.shop['id'], body, file);
  }

  @UseGuards(jwtGuard, VendorGuard)
  @UseInterceptors(filesUpload('image', 8))
  @Patch('/id/:id')
  editWatch(
    @Param('id', ParseIntPipe) id: number,
    @Req() req: tsRequest,
    @Body() body: updateWatchDto,
    @UploadedFile() file: Express.Multer.File[],
  ) {
    return this.watchService.update(id, body, file);
  }

  @Get('/list')
  getList(@Query() query) {
    return this.watchService.findMany(query);
  }

  @UseGuards(jwtGuard, VendorGuard)
  @Delete('/id/:id')
  deleteWatch(@Param('id', ParseIntPipe) id: number, @Req() req: tsRequest) {
    return this.watchService.delete(id);
  }
}
