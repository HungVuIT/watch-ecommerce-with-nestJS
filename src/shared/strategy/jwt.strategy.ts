import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthService } from '../../auth/auth.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { ModuleTokenFactory } from '@nestjs/core/injector/module-token-factory';


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  
  constructor(private prisma: PrismaService, config: ConfigService) {
    // cái này là phần verify token, đọc trong document của nest
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.get('TOKEN_SECRET'),
    });
  }

  // biến đầu vào của hàm này là decoded của token
  // giá trị trả về của hàm này sẽ đc gán vào req.user một cách tự động
  // nếu trả về null hoặc false thì http status 401 sẽ đc throw
  async validate(payload: { id: string; username: string }) {
    const user = await this.prisma.user.findUnique({
      where: { username: payload.username },
    });

    return user;
  }
}
