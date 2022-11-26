import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { hash, verify } from 'argon2';
import { PrismaService } from 'src/prisma/prisma.service';
import { authDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  //hash password trước khi lưu vào db
  //tạo record trong database
  //loai bỏ password trc khi phản hồi
  async signup(body: authDto) {
    try {
      const exit = await this.prisma.user.findUnique({
        where: { username: body.username },
      });

      if (exit)
        throw new HttpException(
          'Username hoặc email đã tồn tại',
          HttpStatus.BAD_REQUEST,
        );

      body.password = await hash(body.password);

      const user = await this.prisma.user.create({ data: body });

      delete user['password'];

      return user;
    } catch (error) {
      throw error;
    }
  }

  // tìm user dựa trên email,không có user thì quăng lỗi
  // có user thì so sánh password, ko khớp thì quăng lỗi
  // tất cả đều đúng, tạo và trả về token
  async signin(body: authDto) {
    try {
      const user = await this.prisma.user.findUnique({
        where: { username: body.username },
      });

      if (!user)
        throw new HttpException(
          'Sai username hoặc email',
          HttpStatus.FORBIDDEN,
        );

      const match = await verify(user.password, body.password);

      if (!match) throw new HttpException('Sai password', HttpStatus.FORBIDDEN);

      return this.signToken(user.id, user.username);
    } catch (error) {
      throw error;
    }
  }

  async tokenByRefreshToken(refreshToken: string) {
    const refresh_secret = this.config.get('REFRESH_TOKEN_SECRET');
    const decoded = this.jwt.verify(refreshToken, { secret: refresh_secret });
    const { id, username } = decoded;
    const secret = this.config.get('TOKEN_SECRET');
    const access_token = this.jwt.sign(
      { id, username },
      {
        expiresIn: '1y',
        secret: secret,
      },
    );
    return {
      access_token: access_token,
    };
  }

  signToken(
    id: number,
    username: string,
  ): {
    access_token: string;
    refresh_token: string;
  } {
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
}
