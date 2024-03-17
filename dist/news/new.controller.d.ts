import { NewsService } from './new.service';
import { createNewDto } from './dto/createNew.dto';
import { editNewDto } from './dto/editNew.dto';
export declare class NewsController {
    private service;
    constructor(service: NewsService);
    createNew(body: createNewDto): Promise<import("@prisma/client/runtime").GetResult<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        content: string;
    }, unknown, never> & {}>;
    editNew(id: number, body: editNewDto): Promise<import("@prisma/client/runtime").GetResult<{
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
    getById(id: number): Promise<import("@prisma/client/runtime").GetResult<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        content: string;
    }, unknown, never> & {}>;
}
