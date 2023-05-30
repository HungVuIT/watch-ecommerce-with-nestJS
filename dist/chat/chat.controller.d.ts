import { ChatService } from './chat.service';
import { MarkAsReadConversationDTO } from './dto/markAsRead.dto';
export declare class ChatController {
    private chatService;
    constructor(chatService: ChatService);
    sendMessage(userId: number, receiverId: number, message: string): Promise<import(".prisma/client").Conversation>;
    getMessages(userId: number, receiverId: number): Promise<import(".prisma/client").Conversation[]>;
    getMyMessages(userId: number): Promise<import(".prisma/client").Conversation[]>;
    chatWith(userId: number): Promise<number[]>;
    markAsRead(chat: MarkAsReadConversationDTO): Promise<void>;
    delete(chatId: number, userId: number): Promise<void>;
}
