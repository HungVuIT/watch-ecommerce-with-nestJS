import { PrismaService } from 'src/prisma/prisma.service';
import { CommentDto } from './dto/comment.dto';
export declare class CommentService {
    private prisma;
    constructor(prisma: PrismaService);
    getCmtOfWatch(watchId: number, query: any): Promise<import(".prisma/client").Comment[]>;
    cmtOnWatch(userId: number, body: CommentDto): Promise<void>;
    deleteCmt(id: number): Promise<import(".prisma/client").Comment>;
}
