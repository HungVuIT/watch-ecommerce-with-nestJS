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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
const argon2_1 = require("argon2");
const mail_service_1 = require("../mail/mail.service");
const prisma_service_1 = require("../prisma/prisma.service");
let AuthService = class AuthService {
    constructor(prisma, jwt, config, mail) {
        this.prisma = prisma;
        this.jwt = jwt;
        this.config = config;
        this.mail = mail;
    }
    async googleLogin(req) {
        try {
            if (!req.user) {
                return 'No user from google';
            }
            const { id, email, firstName, lastName, picture } = req.user;
            let user = await this.prisma.user.findUnique({
                where: { username: id },
            });
            if (!user) {
                user = await this.prisma.user.create({
                    data: {
                        username: id,
                        password: await (0, argon2_1.hash)('onetwothree'),
                        firstName: firstName,
                        lastName: lastName,
                        avatar: picture,
                    },
                });
            }
            return this.signToken(user.id, user.username);
        }
        catch (error) {
            throw error;
        }
    }
    async facebookLogin(req) {
        try {
            if (!req.user) {
                return 'No user from facebook';
            }
            const { id, email, firstName, lastName, picture } = req.user;
            let user = await this.prisma.user.findUnique({
                where: { username: id },
            });
            if (!user) {
                user = await this.prisma.user.create({
                    data: {
                        username: id,
                        password: await (0, argon2_1.hash)('onetwothree'),
                        firstName: firstName,
                        lastName: lastName,
                        avatar: picture,
                    },
                });
            }
            return this.signToken(user.id, user.username);
        }
        catch (error) {
            throw error;
        }
    }
    async signup(body) {
        try {
            const exit = await this.prisma.user.findUnique({
                where: { username: body.username },
            });
            if (exit)
                throw new common_1.HttpException('Username hoặc email đã tồn tại', common_1.HttpStatus.BAD_REQUEST);
            body.password = await (0, argon2_1.hash)(body.password);
            const user = await this.prisma.user.create({ data: body });
            delete user['password'];
            return user;
        }
        catch (error) {
            console.log('================ERROR===============');
            console.log(error);
            throw error;
        }
    }
    async signin(body) {
        try {
            const user = await this.prisma.user.findUnique({
                where: { username: body.username },
            });
            if (!user)
                throw new common_1.HttpException('Sai username hoặc email', common_1.HttpStatus.FORBIDDEN);
            const match = await (0, argon2_1.verify)(user.password, body.password);
            if (!match)
                throw new common_1.HttpException('Sai password', common_1.HttpStatus.FORBIDDEN);
            return this.signToken(user.id, user.username);
        }
        catch (error) {
            throw error;
        }
    }
    async tokenByRefreshToken(refreshToken) {
        try {
            const refresh_secret = this.config.get('REFRESH_TOKEN_SECRET');
            const decoded = this.jwt.verify(refreshToken, { secret: refresh_secret });
            const { id, username } = decoded;
            const secret = this.config.get('TOKEN_SECRET');
            const access_token = this.jwt.sign({ id, username }, {
                expiresIn: '1y',
                secret: secret,
            });
            return {
                access_token: access_token,
            };
        }
        catch (error) {
            throw error;
        }
    }
    async changePassword(id, password) {
        try {
            await this.prisma.user.update({
                where: { id: id },
                data: { password: await (0, argon2_1.hash)(password) },
            });
            return common_1.HttpStatus.OK;
        }
        catch (error) {
            throw error;
        }
    }
    async sendResetPassMail(email) {
        try {
            const user = await this.prisma.user.findUnique({
                where: { email: email },
            });
            if (!user)
                throw new common_1.HttpException('email not found', common_1.HttpStatus.NOT_FOUND);
            const token = this.signToken(user.id, user.username);
            await this.mail.sendUserConfirmation(email, token.access_token);
            return common_1.HttpStatus.OK;
        }
        catch (error) {
            throw error;
        }
    }
    signToken(id, username) {
        const payload = { id, username };
        const secret = this.config.get('TOKEN_SECRET');
        const refresh_secret = this.config.get('REFRESH_TOKEN_SECRET');
        const access_token = this.jwt.sign(payload, {
            expiresIn: '1y',
            secret: secret,
        });
        const refresh_token = this.jwt.sign(payload, {
            expiresIn: '1d',
            secret: refresh_secret,
        });
        return {
            access_token: access_token,
            refresh_token: refresh_token,
        };
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        jwt_1.JwtService,
        config_1.ConfigService,
        mail_service_1.MailService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map