import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UsersService } from './users.service';
// import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { CreateUserInput } from './dto/create-user.input';
import { Logger, UseGuards, UseInterceptors } from '@nestjs/common';
import { CurrentUser, GqlAuthGuard } from 'auth/guards/graph-auth.guard';
import { AuthService } from 'auth/auth.service';
import { User } from './entities/user.entity';
import { SentryInterceptor } from '../Sentry';
import { Role, Status } from '@common/enums';
@UseInterceptors(SentryInterceptor)
@Resolver(() => User)
export class UsersResolver {
  private readonly logger = new Logger(UsersResolver.name);
  constructor(
    private readonly usersService: UsersService,
    private authService: AuthService,
  ) {}

  @Mutation(() => User)
  async registerStudent(
    @Args('createUserInput') createUserInput: CreateUserInput,
  ) {
    try {
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

  @Mutation(() => User)
  // @UseGuards(GqlAuthGuard, AdminGuard)
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

  @Query(() => [User], { name: 'users' })
  // @UseGuards(GqlAuthGuard)
  findAll() {
    return this.usersService.findAll();
  }

  @Query(() => [User], { name: 'students' })
  findStudents() {
    return this.usersService.findByQuery({ role: Role.student });
  }

  @Query(() => User, { name: 'user' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.usersService.findOne({ _id: id });
  }

  @Mutation(() => User)
  @UseGuards(GqlAuthGuard)
  async updateUser(
    @CurrentUser() user: User,
    @Args('updateUserInput') updateUserInput: UpdateUserInput,
  ) {
    try {
      const result = await this.usersService.update(user.id, updateUserInput);

      return result;
    } catch (error) {
      this.logger.error(error);
    }
  }
}
