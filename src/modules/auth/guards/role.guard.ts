import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const roles = this.reflector.get('roles', context.getHandler());
    if (!roles || roles.length < 1) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    return user.roles.some((userRole) => roles.includes(userRole));
  }
}
