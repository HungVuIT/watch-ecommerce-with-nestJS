import { NewsService } from './new.service';
import { createNewDto } from './dto/createNew.dto';
import { editNewDto } from './dto/editNew.dto';
export declare class NewsController {
    private service;
    constructor(service: NewsService);
    createNew(body: createNewDto): Promise<import(".prisma/client").News>;
    editNew(id: number, body: editNewDto): Promise<import(".prisma/client").News>;
    getList(): Promise<import(".prisma/client").News[]>;
    getById(id: number): Promise<import(".prisma/client").News>;
}
