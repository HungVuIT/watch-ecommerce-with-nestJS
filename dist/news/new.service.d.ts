import { PrismaService } from 'src/prisma/prisma.service';
import { createNewDto } from './dto/createNew.dto';
import { editNewDto } from './dto/editNew.dto';
export declare class NewsService {
    private prisma;
    constructor(prisma: PrismaService);
    getById(NewId: number): Promise<import("@prisma/client/runtime").GetResult<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        content: string;
    }, unknown, never> & {}>;
    getList(): Promise<(import("@prisma/client/runtime").GetResult<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        content: string;
    }, unknown, never> & {})[]>;
    editNew(newId: number, body: editNewDto): Promise<import("@prisma/client/runtime").GetResult<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        content: string;
    }, unknown, never> & {}>;
    createNew(body: createNewDto): Promise<import("@prisma/client/runtime").GetResult<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        content: string;
    }, unknown, never> & {}>;
}
