import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MailModule } from 'src/mail/mail.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { FacebookStrategy } from './facebook.strategy';
import { GoogleStrategy } from './google.strategy';

@Module({
  imports: [JwtModule.register({}), MailModule],
  providers: [AuthService, GoogleStrategy, FacebookStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
