import { Socket, Server } from 'socket.io';
import { PrismaService } from 'src/prisma/prisma.service';
export declare class ChatGateway {
    private prisma;
    server: Server;
    constructor(prisma: PrismaService);
    handleConnection(client: Socket): void;
    handleMessage(socket: Socket, data: {
        message: string;
        receiverId: number;
        senderId: number;
    }): Promise<void>;
    handleDisconnect(client: Socket): void;
}
