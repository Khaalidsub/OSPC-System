import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthenticationError } from 'apollo-server-core';
import { IUser, Role } from '../../users/types';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor() {}

  canActivate(context: ExecutionContext): boolean {
    const ctx = GqlExecutionContext.create(context);
    const request = ctx.getContext().req;
    if (request.user) {
      const user = <IUser>request.user;
      if (user.role === Role.admin) return true;
    }
    throw new AuthenticationError(
      'Could not authenticate with token or user does not have permissions',
    );
  }
}
