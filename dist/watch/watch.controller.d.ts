/// <reference types="multer" />
import { tsRequest } from 'src/shared/requestModify/request.config';
import { createWatchDto } from './dto/createWatch.dto';
import { updateWatchDto } from './dto/updateWatch.dto';
import { WatchService } from './watch.service';
export declare class WatchController {
    private watchService;
    constructor(watchService: WatchService);
    createWatch(req: tsRequest, body: createWatchDto, file: Array<Express.Multer.File>): Promise<import(".prisma/client").Watch>;
    editWatch(id: number, req: tsRequest, body: updateWatchDto, file: Express.Multer.File[]): Promise<import(".prisma/client").Watch>;
    getList(query: any): Promise<import(".prisma/client").Watch[]>;
    deleteWatch(id: number): void;
    getWatch(id: number): Promise<import(".prisma/client").Watch>;
}
