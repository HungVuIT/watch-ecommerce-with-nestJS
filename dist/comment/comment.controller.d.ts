import { SharedService } from 'src/shared/shared.service';
import { CommentService } from './comment.service';
import { CommentDto } from './dto/comment.dto';
export declare class CommentController {
    private service;
    private tool;
    constructor(service: CommentService, tool: SharedService);
    cmtOnWatch(id: number, body: CommentDto): Promise<void>;
    getCmtOfWatch(id: number, query: any): Promise<({
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
    deleteCmt(userId: number, commentId: number): Promise<import("@prisma/client/runtime").GetResult<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        UID: number;
        PID: number;
        content: string;
    }, unknown, never> & {}>;
}
