import { SharedService } from 'src/shared/shared.service';
import { CommentService } from './comment.service';
import { CommentDto } from './dto/comment.dto';
export declare class CommentController {
    private service;
    private tool;
    constructor(service: CommentService, tool: SharedService);
    cmtOnWatch(id: number, body: CommentDto): Promise<void>;
    getCmtOfWatch(id: number, query: any): Promise<import(".prisma/client").Comment[]>;
    deleteCmt(userId: number, commentId: number): Promise<import(".prisma/client").Comment>;
}
