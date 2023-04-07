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
exports.FacebookStrategy = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const passport_1 = require("@nestjs/passport");
const passport_facebook_1 = require("passport-facebook");
let FacebookStrategy = class FacebookStrategy extends (0, passport_1.PassportStrategy)(passport_facebook_1.Strategy, 'facebook') {
    constructor(config) {
        const host = process.env.NODE_ENV === 'production' ? 'https://dhwatch.onrender.com' : 'http://localhost:8000';
        super({
            clientID: config.get('FACEBOOK_CLIENT_ID'),
            clientSecret: config.get('FACEBOOK_CLIENT_SECRET'),
            callbackURL: host + '/api/auth/redirect-facebook',
            scope: 'email',
            profileFields: ['emails', 'name'],
        });
    }
    async validate(accessToken, refreshToken, profile, done) {
        try {
            const { name, emails, id } = profile;
            const user = {
                id: id,
                email: emails[0].value,
                firstName: name.givenName,
                lastName: name.familyName,
                accessToken,
                refreshToken,
            };
            done(null, user);
        }
        catch (error) {
            throw error;
        }
    }
};
FacebookStrategy = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], FacebookStrategy);
exports.FacebookStrategy = FacebookStrategy;
//# sourceMappingURL=facebook.strategy.js.map