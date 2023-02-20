import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { createCategoryDto } from './dto/createCategory.dto';
import { editCategoryDto } from './dto/editCategory.dto';

@Injectable()
export class CategoryService {
    constructor(private prisma: PrismaService) {}

    async getById(CategoryId: number) {
        try {
            return await this.prisma.category.findUnique({
                where: {
                    id: CategoryId,
                },
            });
        } catch (error) {
            throw error;
        }
    }

    async getList() {
        try {
            return await this.prisma.category.findMany({});
        } catch (error) {
            throw error;
        }
    }

    async editCategory(categoryId: number, body: editCategoryDto, file: any) {
        try {
            if (file) {
                body.image = file.path;
            }

            return await this.prisma.category.update({
                where: { id: categoryId },
                data: body,
            });
        } catch (error) {
            throw error;
        }
    }

    async createCategory(body: createCategoryDto, file: any) {
        try {
            if (file) {
                body.image = file.path;
            }

            return await this.prisma.category.create({
                data: body,
            });
        } catch (error) {
            throw error;
        }
    }
}
