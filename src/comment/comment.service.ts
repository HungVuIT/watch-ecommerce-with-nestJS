import { BadRequestException, Injectable } from '@nestjs/common';
import { query } from 'express';
import { PrismaService } from 'src/prisma/prisma.service';
import { SharedService } from 'src/shared/shared.service';
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
      throw new BadRequestException(error);
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
    } catch (error) {}
  }

  async deleteCmt(id: number) {
    try {
      return this.prisma.comment.delete({
        where: { id: id },
      });
    } catch (error) {
      throw new BadRequestException(error)
    }
  }
}
