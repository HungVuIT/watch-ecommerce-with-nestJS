import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-facebook';
import { VerifiedCallback } from 'passport-jwt';

@Injectable()
export class FacebookStrategy extends PassportStrategy(Strategy, 'facebook') {
    constructor(config: ConfigService) {
        const host =
            process.env.NODE_ENV === 'production'
                ? 'https://dhwatch.onrender.com'
                : 'http://localhost:8000';

        super({
            clientID: config.get('FACEBOOK_CLIENT_ID'),
            clientSecret: config.get('FACEBOOK_CLIENT_SECRET'),
            callbackURL: host + '/api/auth/redirect-facebook',
            scope: 'email',
            profileFields: ['emails', 'name'],
        });
    }

    async validate(accessToken: string, refreshToken: string, profile: Profile, done: VerifiedCallback): Promise<any> {
        try {
            const { name, emails, id} = profile;
        const user = {
            id: id,
            email: emails[0].value,
            firstName: name.givenName,
            lastName: name.familyName,
            accessToken,
            refreshToken
        };

        done(null, user);
        } catch (error) {
            throw error
        }
        
    }
}
