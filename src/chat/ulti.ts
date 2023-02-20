import { BadRequestException } from '@nestjs/common';

const users: {
    userId: number;
    socketId: any;
}[] = [];

function addUser({ userId, socketId }) {
    // Validate the data
    if (!userId || !socketId) {
        return new BadRequestException();
    }

    // Store user
    const user = { userId, socketId };
    users.push(user);
    return { user };
}

const removeUser = (id) => {
    const index = users.findIndex((user) => user.userId === id);

    if (index !== -1) {
        return users.splice(index, 1)[0];
    }
};

const getUser = (id) => {
    return users.find((user) => user.userId === id);
};

export { addUser, removeUser, getUser };
