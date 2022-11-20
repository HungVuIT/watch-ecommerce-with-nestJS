import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { createBrandDto } from './dto/createBrand.dto';
import { editBrandDto } from './dto/editBrand.dto';

@Injectable()
export class BrandService {
  constructor(private prisma: PrismaService) {}

  async getById(BrandId: number) {
    try {
      return await this.prisma.category.findUnique({
        where: {
          id: BrandId,
        },
      });
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async getList() {
    try {
      return await this.prisma.category.findMany({});
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async editBrand(categoryId: number, body: editBrandDto, file: any) {
    try {
      if (file) {
        body.image = file.path;
      }

      return await this.prisma.category.update({
        where: { id: categoryId },
        data: body,
      });
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async createBrand(body: createBrandDto, file: any) {
    try {
      if (file) {
        body.image = file.path;
      }

      return await this.prisma.category.create({
        data: body,
      });
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
