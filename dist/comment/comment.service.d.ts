import { PrismaService } from 'src/prisma/prisma.service';
import { CommentDto } from './dto/comment.dto';
export declare class CommentService {
    private prisma;
    constructor(prisma: PrismaService);
    getCmtOfWatch(watchId: number, query: any): Promise<({
        user: import("@prisma/client/runtime").GetResult<{
            id: number;
            createdAt: Date;
            updatedAt: Date;
            username: string;
            password: string;
            email: string;
            phoneNumber: string;
            firstName: string;
            lastName: string;
            province: string;
            district: string;
            ward: string;
            address: string;
            gender: import(".prisma/client").Gender;
            birthDay: Date;
            avatar: string;
            status: boolean;
            role: import(".prisma/client").Role;
            isActive: boolean;
        }, unknown, never> & {};
    } & import("@prisma/client/runtime").GetResult<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        UID: number;
        PID: number;
        content: string;
    }, unknown, never> & {})[]>;
    cmtOnWatch(userId: number, body: CommentDto): Promise<void>;
    deleteCmt(id: number): Promise<import("@prisma/client/runtime").GetResult<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        UID: number;
        PID: number;
        content: string;
    }, unknown, never> & {}>;
}
