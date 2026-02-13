import { UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

export class JwtAuthGuard extends AuthGuard('jwt') {
  handleRequest(err, user) {
    if (err || !user) {
      throw (
        err ||
        new UnauthorizedException(
          'Token tidak valid atau sudah kadaluarsa, silahkan login kembali!',
        )
      );
    }
    return user;
  }
}
