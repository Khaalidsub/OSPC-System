import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
// import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { CreateUserInput } from './dto/create-user.input';
import { HttpException, HttpStatus, Logger, UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/guards/graph-auth.guard';
import { AdminGuard } from '../auth/guards/graph-admin.auth.guard';
import { AuthService } from '../auth/auth.service';
import { Role, Status } from './types';
import {
  emailError,
  invalidEmailError,
  invalidPasswordError,
} from '../util/exceptions';
import { REG_EMAIL } from '../util/checkers';

@Resolver(() => User)
export class UsersResolver {
  private readonly logger = new Logger(UsersResolver.name);
  constructor(
    private readonly usersService: UsersService,
    private authService: AuthService,
  ) {}

  @Mutation(() => User || Boolean)
  async registerStudent(
    @Args('createUserInput') createUserInput: CreateUserInput,
  ) {
    try {
      await this.validate(createUserInput);

      return this.authService.register(
        createUserInput,
        Role.student,
        Status.pending,
      );
    } catch (error) {
      throw new Error(error);
    }
  }

  async validate(user: CreateUserInput) {
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

  @Mutation(() => User)
  @UseGuards(GqlAuthGuard, AdminGuard)
  async approveStudent(@Args('id') id: string) {
    try {
      const result = await this.usersService.update(id, {
        accountStatus: Status.active,
      });
      return result;
    } catch (error) {
      return error;
    }
  }

  @Query(() => [User], { name: 'users' })
  @UseGuards(GqlAuthGuard)
  findAll() {
    return this.usersService.findAll();
  }

  @Query(() => User, { name: 'user' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.usersService.findOne({ _id: id });
  }

  @Mutation(() => User)
  @UseGuards(GqlAuthGuard)
  updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
    return this.usersService.update(updateUserInput.id, updateUserInput);
  }
}
