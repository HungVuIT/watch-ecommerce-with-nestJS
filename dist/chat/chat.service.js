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
    async saveConversation(payload) {
        const result = await this.prisma.conversation.create({
            data: payload,
        });
        this.chatGateway.server.emit('server-send-data' + result.receiverId, result);
        return result;
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