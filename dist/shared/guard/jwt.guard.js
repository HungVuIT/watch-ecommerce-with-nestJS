"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jwtGuard = void 0;
const passport_1 = require("@nestjs/passport");
class jwtGuard extends (0, passport_1.AuthGuard)('jwt') {
    constructor() {
        super();
    }
}
exports.jwtGuard = jwtGuard;
//# sourceMappingURL=jwt.guard.js.map