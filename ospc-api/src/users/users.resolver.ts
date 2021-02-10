import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UsersService } from './users.service';
// import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { CreateUserInput } from './dto/create-user.input';
import { HttpException, HttpStatus, Logger, UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/guards/graph-auth.guard';
import { AdminGuard } from '../auth/guards/graph-admin.auth.guard';
import { AuthService } from '../auth/auth.service';
import { IUser, Role, Status } from './types';
import {
  emailError,
  invalidEmailError,
  invalidPasswordError,
} from '../util/exceptions';
import { REG_EMAIL } from '../util/checkers';

@Resolver(() => IUser)
export class UsersResolver {
  private readonly logger = new Logger(UsersResolver.name);
  constructor(
    private readonly usersService: UsersService,
    private authService: AuthService,
  ) {}

  @Mutation(() => IUser)
  async registerStudent(
    @Args('createUserInput') createUserInput: CreateUserInput,
  ) {
    try {
      await this.validateUser(createUserInput);

      return this.authService.register(
        createUserInput,
        Role.student,
        Status.pending,
      );
    } catch (error) {
      this.logger.error(error);
      throw new Error(error);
    }
  }

  async validateUser(user: CreateUserInput) {
    const findUser = await this.usersService.findOne({ email: user.email });

    if (findUser) {
      throw new HttpException(emailError, HttpStatus.BAD_REQUEST);
    }
    if (!REG_EMAIL.test(user.email)) {
      throw new HttpException(invalidEmailError, HttpStatus.BAD_REQUEST);
    }
    if (user.password.length < 6) {
      throw new HttpException(invalidPasswordError, HttpStatus.BAD_REQUEST);
    }
  }

  @Mutation(() => IUser)
  @UseGuards(GqlAuthGuard, AdminGuard)
  async approveStudent(@Args('id') id: string) {
    try {
      const result = await this.usersService.update(id, {
        accountStatus: Status.active,
      });

      return result;
    } catch (error) {
      this.logger.error(error);
      return error;
    }
  }

  @Query(() => [IUser], { name: 'users' })
  @UseGuards(GqlAuthGuard)
  findAll() {
    return this.usersService.findAll();
  }

  @Query(() => IUser, { name: 'user' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.usersService.findOne({ _id: id });
  }

  @Mutation(() => IUser)
  @UseGuards(GqlAuthGuard)
  async updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
    try {
      const result = await this.usersService.update(
        updateUserInput.id,
        updateUserInput,
      );

      return result;
    } catch (error) {
      this.logger.error(error);
    }
  }
}
