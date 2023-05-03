import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { createBrandDto } from './dto/createBrand.dto';
import { editBrandDto } from './dto/editBrand.dto';

@Injectable()
export class BrandService {
    constructor(private prisma: PrismaService) {}

    async getById(BrandId: number) {
        try {
            return await this.prisma.brand.findUnique({
                where: {
                    id: BrandId,
                },
            });
        } catch (error) {
            throw error;
        }
    }

    async getList() {
        try {
            return await this.prisma.brand.findMany({});
        } catch (error) {
            throw error;
        }
    }

    async editBrand(brandId: number, body: editBrandDto, file: any) {
        try {
            if (file) {
                body.image = file.path;
            }

            return await this.prisma.brand.update({
                where: { id: brandId },
                data: body,
            });
        } catch (error) {
            console.log('===============ERROR==============');

            console.log(error);

            return new HttpException({ message: 'server conflict', success: false }, HttpStatus.CONFLICT);
        }
    }

    async createBrand(body: createBrandDto, file: any) {
        try {
            if (file) {
                body.image = file.path;
            }

            return await this.prisma.brand.create({
                data: body,
            });
        } catch (error) {
            throw error;
        }
    }

    async delete(id: number) {
        try {
            return await this.prisma.brand.delete({
                where: { id: id },
            });
        } catch (error) {
            throw error;
        }
    }
}
