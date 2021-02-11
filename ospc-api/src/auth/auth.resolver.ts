import { UnauthorizedException, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { IUser } from '../users/types';
import { User } from '../users/entities/user.entity';
import { AuthService } from './auth.service';
import { CurrentUser, GqlAuthGuard } from './guards/graph-auth.guard';

@Resolver(() => IUser)
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => String)
  async loginUser(
    @Args('email') email: string,
    @Args('password') password: string,
  ) {
    const result = await this.authService.validateUser({ email, password });
    if (result) {
      return this.authService.login({ email: email, sub: result.id });
    }
    throw new UnauthorizedException(result);
  }

  @Query(() => IUser)
  @UseGuards(GqlAuthGuard)
  async currentUser(@CurrentUser() user: User) {
    return user;
  }
}
