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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const prisma_service_1 = require("../prisma/prisma.service");
const ulti_1 = require("./ulti");
let ChatGateway = class ChatGateway {
    constructor(prisma) {
        this.prisma = prisma;
    }
    handleConnection(client) {
        const userId = Number(client.handshake.query.userId);
        const device = {
            userId: userId,
            socketId: client.id,
        };
        console.log('connection');
        (0, ulti_1.addUser)(device);
    }
    async handleMessage(socket, data) {
        const receiver = (0, ulti_1.getUser)(data.receiverId);
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
    handleDisconnection(client, userId) {
        const device = {
            userId: userId,
            socketId: client.id,
        };
        (0, ulti_1.removeUser)(userId);
    }
};
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], ChatGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)('client-send-data'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", Promise)
], ChatGateway.prototype, "handleMessage", null);
ChatGateway = __decorate([
    (0, websockets_1.WebSocketGateway)({ namespace: '/chat-gate-way' }),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ChatGateway);
exports.ChatGateway = ChatGateway;
//# sourceMappingURL=chat.gateway.js.map