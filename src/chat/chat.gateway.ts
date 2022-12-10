import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer, WsResponse } from "@nestjs/websockets";
import { Socket, Server } from 'socket.io';

@WebSocketGateway()
export class ChatGateway {
  @WebSocketServer()
  Sever: Server;

  // @SubscribeMessage('createRoom')
  // createRoom(socket: Socket, data: string): WsResponse<unknown> {
  //   socket.join('aRoom');
  //   socket.to('aRoom').emit('roomCreated', {room: 'aRoom'});
  //   return { event: 'roomCreated', room: 'aRoom' };
  // }
}