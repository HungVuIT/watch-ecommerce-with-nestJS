import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { createSaleOffDto } from './dto/createSaleOff.dto';
import { editSaleOffDto } from './dto/editSaleOff.dto';

@Injectable()
export class SaleOffService {
    constructor(private prisma: PrismaService) {}

    async editSaleOff(body: editSaleOffDto) {
        try {
            return await this.prisma.sale_off.update({
                where: { id: body.id },
                data: { ...body },
            });
        } catch (error) {
            throw error;
        }
    }

    async createSaleOff(body: createSaleOffDto) {
        try {
            return await this.prisma.sale_off.create({
                data: { ...body, quantity: 1 },
            });
        } catch (error) {
            throw error;
        }
    }
}
