/// <reference types="multer" />
import { PrismaService } from 'src/prisma/prisma.service';
import { userDto } from './dto/user.dto';
export declare class UserService {
    private prisma;
    constructor(prisma: PrismaService);
    editMe(id: number, body: userDto, file: Express.Multer.File): Promise<import(".prisma/client").User>;
    getUserById(id: number): Promise<import(".prisma/client").User>;
    delete(id: number): Promise<void>;
    getList(option: any): Promise<import(".prisma/client").User[]>;
}
