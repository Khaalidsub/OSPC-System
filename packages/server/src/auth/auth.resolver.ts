import {
  UnauthorizedException,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from '../users/entities/user.entity';
import { AuthService } from './auth.service';
import { CurrentUser, GqlAuthGuard } from './guards/graph-auth.guard';
import { SentryInterceptor } from '../Sentry';
import { AuthResult } from './types';
import { Role } from '@common/enums';
import { Credential } from './entities/credential.entity';
@UseInterceptors(SentryInterceptor)
@Resolver(() => User)
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => AuthResult)
  async loginUser(
    @Args('credentials') { email, password }: Credential,
  ): Promise<AuthResult> {
    try {
      const result = await this.authService.validateUser({ email, password });
      return {
        token: await this.authService.login({ email: email, sub: result.id }),
        user: result,
      };
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }
  }

  @Query(() => User)
  @UseGuards(GqlAuthGuard)
  async currentUser(@CurrentUser() user: User) {
    return user;
  }
}
