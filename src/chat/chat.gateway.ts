import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer, WsResponse } from "@nestjs/websockets";
import { Socket, Server } from 'socket.io';
import { addUser, getUser, removeUser } from "./ulti";

@WebSocketGateway()
export class ChatGateway {
  @WebSocketServer()
  Sever: Server;

  handleConnection(client: Socket, userId: number) {

    const device = {
      userId: userId,
      socketId: client.id,
    };

    addUser(device)
  }

  @SubscribeMessage('client-send-data')
  createRoom(socket: Socket, data: {messenger: string, receiverId: number}){

    const user = getUser(data.receiverId)

    socket.to(user.socketId).emit('server-send-data', {messenger: data.messenger});
  }

  handleDisconnection(client: Socket, userId: number) {

    const device = {
      userId: userId,
      socketId: client.id,
    };

    removeUser(userId)
  }
}