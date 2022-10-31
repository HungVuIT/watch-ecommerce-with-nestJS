import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { JwtStrategy } from '../shared/strategy';
import { AdminGuard } from '../shared/guard/admin.guard';

@Module({
  imports: [JwtModule.register({})],
  providers: [AuthService],
  controllers: [AuthController]
})
export class AuthModule {}
