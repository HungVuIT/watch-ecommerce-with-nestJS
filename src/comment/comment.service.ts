import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CommentDto } from './dto/comment.dto';

@Injectable()
export class CommentService {
  constructor(private prisma: PrismaService) {}

  async getCmtOfWatch(watchId: number, query: any) {
    try {
      return await this.prisma.comment.findMany({
        where: { WID: watchId },
        orderBy: { createdAt: 'desc' },
        skip: query.skip,
        take: query.take,
      });
    } catch (error) {
      throw error;
    }
  }

  async cmtOnWatch(userId: number, body: CommentDto) {
    try {
      await this.prisma.comment.create({
        data: {
          UID: userId,
          WID: body.watchId,
          content: body.content,
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async deleteCmt(id: number) {
    try {
      return this.prisma.comment.delete({
        where: { id: id },
      });
    } catch (error) {
      throw error;
    }
  }
}
