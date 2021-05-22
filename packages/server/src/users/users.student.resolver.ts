import { Logger, UseGuards, UseInterceptors } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Role, Status } from '@common/enums';
import { AuthService } from 'auth/auth.service';
import { SentryInterceptor } from '../Sentry';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';
import { CreateUserInput } from './dto/create-user.input';
import { StudentLessons } from 'types';
import { CurrentUser, GqlAuthGuard } from 'auth/guards/graph-auth.guard';
import { StudentMetrics } from './dto/student.metric';

@UseInterceptors(SentryInterceptor)
@Resolver(() => User)
export class UsersStudentResolver {
  private readonly logger = new Logger(UsersStudentResolver.name);
  constructor(
    private readonly usersService: UsersService,
    private authService: AuthService,
  ) {}

  @Query(() => [StudentLessons], { name: 'studentLessons' })
  @UseGuards(GqlAuthGuard)
  findStudentLessons(@CurrentUser() user: User) {
    try {
      return this.usersService.findStudentLessons(user.id);
    } catch (error) {
      throw new Error(error.message);
    }
  }
  @Query(() => StudentMetrics, { name: 'studentMetrics' })
  @UseGuards(GqlAuthGuard)
  async studentMetrics(@CurrentUser() user: User) {
    //learning hours
    //questions asked
    // questions answered
    const metrics = await this.usersService.findStudentMetrics(user.id);

    return metrics[0];
  }
}
