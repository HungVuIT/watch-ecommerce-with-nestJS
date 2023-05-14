import { Injectable } from '@nestjs/common';
import { Conversation, User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { ChatGateway } from './chat.gateway';
import { CreateConversationDTO } from './dto/create-conversation.dto';
import { MarkAsReadConversationDTO } from './dto/markAsRead.dto';

Injectable();
export class ChatService {
    constructor(private prisma: PrismaService, private chatGateway: ChatGateway) {}

    async getConversation(senderId: number, receiverId: number) {
        const sender = await this.prisma.conversation.findMany({
            where: {
                senderId: senderId,
                receiverId: receiverId,
            },
            orderBy: {
                createdAt: 'asc',
            },
        });

        const receiver = await this.prisma.conversation.findMany({
            where: {
                senderId: receiverId,
                receiverId: senderId,
            },
            orderBy: {
                createdAt: 'asc',
            },
        });

        // Trộn hai mảng sender và receiver thành một mảng conversations
        const conversations = sender.concat(receiver);

        // Sắp xếp các tin nhắn theo thời gian tạo
        conversations.sort((a: any, b: any) => {
            const timeA = new Date(a.createdAt).getTime();
            const timeB = new Date(b.createdAt).getTime();
            return timeA - timeB;
        });

        // Thêm thuộc tính 'me' vào các tin nhắn của người gửi
        conversations.forEach((conversation) => {
            if (conversation.senderId === senderId) {
                conversation['me'] = true;
            }
            conversation['me'] = false;
        });

        return conversations
    }

    async saveConversation(payload: CreateConversationDTO) {
        const result = await this.prisma.conversation.create({
            data: payload,
        });

        this.chatGateway.server.emit('server-send-data' + result.receiverId, result);
        return result;
    }

    async markAllBeforeAsRead(conversation: MarkAsReadConversationDTO) {
        return;
    }

    async deleteConversation(conversationId: number, userId: number) {
        return;
    }
}
