import { Socket, Server } from 'socket.io';
export declare class ChatGateway {
    Sever: Server;
    handleConnection(client: Socket, userId: number): void;
    createRoom(socket: Socket, data: {
        messenger: string;
        receiverId: number;
    }): void;
    handleDisconnection(client: Socket, userId: number): void;
}
