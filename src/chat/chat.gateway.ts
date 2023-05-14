import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer, WsResponse } from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { PrismaService } from 'src/prisma/prisma.service';
import { addUser, getUser, removeUser } from './ulti';

@WebSocketGateway({ namespace: '/chat-gate-way' })
export class ChatGateway {
    @WebSocketServer()
    server: Server;

    constructor(private prisma: PrismaService) {}

    handleConnection(client: Socket) {
        const userId = Number(client.handshake.query.userId);

        const device = {
            userId: userId,
            socketId: client.id,
        };
        console.log('connection');
        addUser(device);
    }

    @SubscribeMessage('client-send-data')
    async handleMessage(socket: Socket, data: { message: string; receiverId: number; senderId: number }) {
        const receiver = getUser(data.receiverId);

        if (receiver) {
            this.server.to(receiver.socketId).emit('server-send-data', data);
        }

        await this.prisma.conversation.create({
            data: {
                senderId: data.senderId,
                receiverId: data.receiverId,
                content: data.message,
            },
        });
    }

    handleDisconnection(client: Socket, userId: number) {
        const device = {
            userId: userId,
            socketId: client.id,
        };
        console.log('disconnection');
        removeUser(userId);
    }
}
