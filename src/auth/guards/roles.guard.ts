// auth/guards/roles.guard.ts
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {} // Reflector untuk membaca metadata

  canActivate(context: ExecutionContext): boolean {
    // Ambil role yang dibutuhkan dari decorator @Roles
    const requiredRoles = this.reflector.get<string[]>(
      'roles',
      context.getHandler(),
    );
    if (!requiredRoles) return true; // Jika route tidak pasang @Roles, anggap publik
    const { user } = context.switchToHttp().getRequest();
    // Cek apakah role user ada di dalam daftar role yang diizinkan
    if (!requiredRoles.includes(user?.role)) {
      throw new ForbiddenException(
        `Role ${user?.role} tidak memiliki akses ke endpoint ini!`,
      );
    }
    return requiredRoles.includes(user?.role);
  }
}
