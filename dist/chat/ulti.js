"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUser = exports.removeUser = exports.addUser = void 0;
const common_1 = require("@nestjs/common");
const users = [];
function addUser({ userId, socketId }) {
    if (!userId || !socketId) {
        return new common_1.BadRequestException();
    }
    const user = { userId, socketId };
    users.push(user);
    return { user };
}
exports.addUser = addUser;
const removeUser = (id) => {
    const index = users.findIndex((user) => user.userId === id);
    if (index !== -1) {
        return users.splice(index, 1)[0];
    }
};
exports.removeUser = removeUser;
const getUser = (id) => {
    return users.find((user) => user.userId === id);
};
exports.getUser = getUser;
//# sourceMappingURL=ulti.js.map