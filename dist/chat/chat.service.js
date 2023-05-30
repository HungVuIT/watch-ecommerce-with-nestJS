"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatService = void 0;
const common_1 = require("@nestjs/common");
(0, common_1.Injectable)();
class ChatService {
    constructor(prisma, chatGateway) {
        this.prisma = prisma;
        this.chatGateway = chatGateway;
    }
    async getConversation(senderId, receiverId) {
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
        const conversations = sender.concat(receiver);
        conversations.sort((a, b) => {
            const timeA = new Date(a.createdAt).getTime();
            const timeB = new Date(b.createdAt).getTime();
            return timeA - timeB;
        });
        conversations.forEach((conversation) => {
            if (conversation.senderId === senderId) {
                conversation['me'] = true;
            }
            conversation['me'] = false;
        });
        return conversations;
    }
    async saveConversation(payload) {
        const result = await this.prisma.conversation.create({
            data: payload,
        });
        this.chatGateway.server.emit('server-send-data' + result.receiverId, result);
        return result;
    }
    async chatWith(userId) {
        const list = await this.prisma.conversation.findMany({
            where: {
                senderId: userId,
            },
            orderBy: {
                createdAt: 'desc',
            },
        });
        let receivers = list.map(item => item.receiverId);
        return [...new Set(receivers)];
    }
    async markAllBeforeAsRead(conversation) {
        return;
    }
    async deleteConversation(conversationId, userId) {
        return;
    }
}
exports.ChatService = ChatService;
//# sourceMappingURL=chat.service.js.map