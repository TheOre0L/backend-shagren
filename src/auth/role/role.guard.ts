import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Roles } from '../roles/roles.decorator';
import { Request } from 'express';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  matchRoles(roles: string[], userRole: string) {
    return roles.some((role) => role === userRole);
  }

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>(Roles, context.getHandler());

    if (!roles) {
      return true;
    }

    const request: Request = context.switchToHttp().getRequest();
    // FIXME
    const user = request.user as Express.User & { role: string };

    return this.matchRoles(roles, user.role);
  }
}
