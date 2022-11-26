import { AuthGuard } from '@nestjs/passport';

// là một đối tượng AuthGuard link tới strategy jwt
// format lại tên thành jwtGuard để dễ sử dụng
export class jwtGuard extends AuthGuard('jwt') {
  constructor() {
    super();
  }
}
