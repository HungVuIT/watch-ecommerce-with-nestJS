import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { createNewDto } from './dto/createNew.dto';
import { editNewDto } from './dto/editNew.dto';

@Injectable()
export class NewsService {
    constructor(private prisma: PrismaService) {}

    async getById(NewId: number) {
        try {
            return await this.prisma.news.findUnique({
                where: {
                    id: NewId,
                },
            });
        } catch (error) {
            throw error;
        }
    }

    async getList() {
        try {
            return await this.prisma.news.findMany({});
        } catch (error) {
            throw error;
        }
    }

    async editNew(newId: number, body: editNewDto) {
        try {
            return await this.prisma.news.update({
                where: { id: newId },
                data: body,
            });
        } catch (error) {
            throw error;
        }
    }

    async createNew(body: createNewDto) {
        try {
            return await this.prisma.news.create({
                data: body,
            });
        } catch (error) {
            throw error;
        }
    }
}
