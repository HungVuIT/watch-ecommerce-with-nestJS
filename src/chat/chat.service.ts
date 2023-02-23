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
        return this.prisma.conversation.findMany({
            where: {
                senderId: senderId,
                receiverId: receiverId,
            },
            orderBy: {
                createdAt: 'asc',
            },
        });
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
