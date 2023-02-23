import { IsNotEmpty } from 'class-validator';

export class MarkAsReadConversationDTO {
    @IsNotEmpty()
    senderId: number;

    @IsNotEmpty()
    receiverId: number;

    @IsNotEmpty()
    createdAt: Date;
}
