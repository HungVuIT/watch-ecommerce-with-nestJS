import { ConfigService } from '@nestjs/config';
import { Profile, Strategy } from 'passport-facebook';
import { VerifiedCallback } from 'passport-jwt';
declare const FacebookStrategy_base: new (...args: any[]) => Strategy;
export declare class FacebookStrategy extends FacebookStrategy_base {
    constructor(config: ConfigService);
    validate(accessToken: string, refreshToken: string, profile: Profile, done: VerifiedCallback): Promise<any>;
}
export {};
