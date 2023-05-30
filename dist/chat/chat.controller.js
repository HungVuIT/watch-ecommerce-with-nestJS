"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatController = void 0;
const common_1 = require("@nestjs/common");
const user_decorator_1 = require("../shared/customDecorator/user.decorator");
const guard_1 = require("../shared/guard");
const chat_service_1 = require("./chat.service");
const create_conversation_dto_1 = require("./dto/create-conversation.dto");
const markAsRead_dto_1 = require("./dto/markAsRead.dto");
let ChatController = class ChatController {
    constructor(chatService) {
        this.chatService = chatService;
    }
    sendMessage(userId, receiverId, message) {
        const createChatDTO = new create_conversation_dto_1.CreateConversationDTO();
        createChatDTO.senderId = userId;
        createChatDTO.receiverId = receiverId;
        createChatDTO.content = message;
        return this.chatService.saveConversation(createChatDTO);
    }
    getMessages(userId, receiverId) {
        return this.chatService.getConversation(userId, receiverId);
    }
    getMyMessages(userId) {
        return this.chatService.getConversation(userId, null);
    }
    chatWith(userId) {
        return this.chatService.chatWith(userId);
    }
    markAsRead(chat) {
        return this.chatService.markAllBeforeAsRead(chat);
    }
    delete(chatId, userId) {
        return this.chatService.deleteConversation(chatId, userId);
    }
};
__decorate([
    (0, common_1.Post)(':receiverId/sendMessage'),
    __param(0, (0, user_decorator_1.User)('id')),
    __param(1, (0, common_1.Param)('receiverId', common_1.ParseIntPipe)),
    __param(2, (0, common_1.Body)('message')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, String]),
    __metadata("design:returntype", void 0)
], ChatController.prototype, "sendMessage", null);
__decorate([
    (0, common_1.Get)(':receiverId/messages'),
    __param(0, (0, user_decorator_1.User)('id')),
    __param(1, (0, common_1.Param)('receiverId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", void 0)
], ChatController.prototype, "getMessages", null);
__decorate([
    (0, common_1.Get)('messages'),
    __param(0, (0, user_decorator_1.User)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ChatController.prototype, "getMyMessages", null);
__decorate([
    (0, common_1.Get)('with-user'),
    __param(0, (0, user_decorator_1.User)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ChatController.prototype, "chatWith", null);
__decorate([
    (0, common_1.Post)(':receiverId/markAsRead'),
    __param(0, (0, common_1.Body)(common_1.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [markAsRead_dto_1.MarkAsReadConversationDTO]),
    __metadata("design:returntype", void 0)
], ChatController.prototype, "markAsRead", null);
__decorate([
    (0, common_1.Delete)('delete/:chatId'),
    __param(0, (0, common_1.Query)(common_1.ParseIntPipe)),
    __param(1, (0, user_decorator_1.User)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", void 0)
], ChatController.prototype, "delete", null);
ChatController = __decorate([
    (0, common_1.Controller)('chat'),
    (0, common_1.UseGuards)(guard_1.jwtGuard),
    __metadata("design:paramtypes", [chat_service_1.ChatService])
], ChatController);
exports.ChatController = ChatController;
//# sourceMappingURL=chat.controller.js.map