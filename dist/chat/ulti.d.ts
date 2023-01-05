import { BadRequestException } from '@nestjs/common';
declare function addUser({ userId, socketId }: {
    userId: any;
    socketId: any;
}): BadRequestException | {
    user: {
        userId: any;
        socketId: any;
    };
};
declare const removeUser: (id: any) => {
    userId: number;
    socketId: any;
};
declare const getUser: (id: any) => {
    userId: number;
    socketId: any;
};
export { addUser, removeUser, getUser };
