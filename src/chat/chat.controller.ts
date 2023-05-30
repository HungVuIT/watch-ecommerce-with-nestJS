import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Query, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/shared/customDecorator/user.decorator';
import { jwtGuard } from 'src/shared/guard';
import { ChatService } from './chat.service';
import { CreateConversationDTO } from './dto/create-conversation.dto';
import { MarkAsReadConversationDTO } from './dto/markAsRead.dto'



@Controller('chat')
@UseGuards(jwtGuard)
export class ChatController {
    constructor(private chatService: ChatService) {}

    @Post(':receiverId/sendMessage')
    sendMessage(
        @User('id') userId: number,
        @Param('receiverId', ParseIntPipe) receiverId: number,
        @Body('message') message: string
    ) {
        const createChatDTO = new CreateConversationDTO();
        createChatDTO.senderId = userId;
        createChatDTO.receiverId = receiverId;
        createChatDTO.content = message;
        return this.chatService.saveConversation(createChatDTO);
    }

    @Get(':receiverId/messages')
    getMessages(
        @User('id') userId: number,
        @Param('receiverId', ParseIntPipe) receiverId: number,
    ) {
        return this.chatService.getConversation(userId, receiverId);
    }

    @Get('messages')
    getMyMessages(@User('id') userId: number) {
        return this.chatService.getConversation(userId, null);
    }

    @Get('with-user')
    chatWith(@User('id') userId: number) {
        return this.chatService.chatWith(userId);
    }

    @Post(':receiverId/markAsRead')
    markAsRead(@Body(ValidationPipe) chat: MarkAsReadConversationDTO) {
        return this.chatService.markAllBeforeAsRead(chat);
    }

    @Delete('delete/:chatId')
    delete(@Query(ParseIntPipe) chatId: number, @User('id') userId: number) {
        return this.chatService.deleteConversation(chatId, userId);
    }
}
