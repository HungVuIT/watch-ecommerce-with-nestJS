import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { User } from 'src/shared/customDecorator/user.decorator';
import { jwtGuard } from 'src/shared/guard';
import { TransResInterceptor } from 'src/shared/res.interceptor';
import { SharedService } from 'src/shared/shared.service';
import { CommentService } from './comment.service';
import { CommentDto } from './dto/comment.dto';

@UseInterceptors(FileInterceptor(''))
@UseInterceptors(TransResInterceptor)
@Controller('comment')
export class CommentController {
  constructor(private service: CommentService, private tool: SharedService) {}

  @UseGuards(jwtGuard)
  @Post()
  cmtOnWatch(@User('id') id: number, @Body() body: CommentDto) {
    return this.service.cmtOnWatch(id, body);
  }

  @Get(':watchId')
  getCmtOfWatch(@Param('watchId', ParseIntPipe) id: number, @Query() query) {
    return this.service.getCmtOfWatch(id, query);
  }

  @UseGuards(jwtGuard)
  @Delete(':id')
  async deleteCmt(
    @User('id') userId: number,
    @Param('id', ParseIntPipe) commentId: number,
  ) {
    if (await this.tool.havePermisson(userId, commentId, 'comment'))
      return this.service.deleteCmt(commentId);
    else
      throw new HttpException(
        "you don't own this comment",
        HttpStatus.FORBIDDEN,
      );
  }
}
