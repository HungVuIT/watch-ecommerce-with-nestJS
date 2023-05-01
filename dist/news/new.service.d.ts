import { PrismaService } from 'src/prisma/prisma.service';
import { createNewDto } from './dto/createNew.dto';
import { editNewDto } from './dto/editNew.dto';
export declare class NewsService {
    private prisma;
    constructor(prisma: PrismaService);
    getById(NewId: number): Promise<import(".prisma/client").News>;
    getList(): Promise<import(".prisma/client").News[]>;
    editNew(newId: number, body: editNewDto): Promise<import(".prisma/client").News>;
    createNew(body: createNewDto): Promise<import(".prisma/client").News>;
}
