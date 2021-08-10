import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { UsersService } from './users.service';
// import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { CreateUserInput } from './dto/create-user.input';
import { Logger, UseGuards, UseInterceptors } from '@nestjs/common';
import { CurrentUser, GqlAuthGuard } from 'auth/guards/graph-auth.guard';
import { AuthService } from 'auth/auth.service';
import { User, UserDocument } from './entities/user.entity';
import { SentryInterceptor } from '../Sentry';
import { Role, Status } from '@common/enums';
import { CoachLessons, StudentLessons } from 'types';
import { EventEmitter2 } from '@nestjs/event-emitter';

@UseInterceptors(SentryInterceptor)
@Resolver(() => User)
export class UsersResolver {
  private readonly logger = new Logger(UsersResolver.name);
  constructor(
    private readonly usersService: UsersService,
    private authService: AuthService,
    private eventEmitter: EventEmitter2,
  ) {}

  @Mutation(() => User)
  async registerStudent(
    @Args('createUserInput') createUserInput: CreateUserInput,
  ) {
    try {
      const user  =await this.authService.register(
        createUserInput,
        Role.student,
        Status.pending,
      );
      this.eventEmitter.emit('user.created', user);
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
      this.eventEmitter.emit('user.approved', result);
      return result;
    } catch (error) {
      this.logger.error(error);
      return error;
    }
  }

  @Mutation(() => User)
  async rejectStudent(@Args('id') id: string) {
    try {
      const result = await this.usersService.update(id, {
        accountStatus: Status.rejected,
      });
      this.eventEmitter.emit('user.rejected', result);
      return result;
    } catch (error) {
      throw new Error(error.message);
    }
  }
  @Mutation(() => User)
  async rejectCoach(@Args('id') id: string) {
    try {
      const result = await this.usersService.update(id, {
        coachingStatus: Status.rejected,
      });
      this.eventEmitter.emit('coach.rejected', result);
      return result;
    } catch (error) {
      throw new Error(error.message);
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
  @Query(() => [User], { name: 'pendingCoaches' })
  findPendingCoaches() {
    return this.usersService.findByQuery({
      coachingStatus: { $in: [Status.active, Status.pending, Status.rejected] },
    });
  }
  @Query(() => [User], { name: 'activeCoaches' })
  findActiveCoaches(@Args('subject', { nullable: true }) subjectId: string) {

    if (subjectId) {
      return this.usersService.findCoachBySubject(subjectId);
    }
    return this.usersService.findByQuery({
      coachingStatus: Status.active,
    });
  }

  @Query(() => [CoachLessons], { name: 'coachLessons' })
  @UseGuards(GqlAuthGuard)
  findCoachesAndLessons(
    @CurrentUser() user: User,
    @Args('subject', { nullable: true }) subjectId: string,
  ) {
    try {
      return this.usersService.findCoachesAndStudentLessons(user.id, subjectId);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  @Query(() => [User], { name: 'moderators' })
  findModerators() {
    return this.usersService.findByQuery({
      role: Role.moderator,
    });
  }

  @Query(() => User, { name: 'user' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.usersService.findOne({ _id: id });
  }

  @Query(() => String, { name: 'fakeData' })
  async populateData() {
    await this.usersService.populateData();
    return 'data populated';
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
      if (error?.codeName === 'DuplicateKey') {
        throw new Error('Email Already Exists');
      }

      this.logger.error(error);
      throw new Error(error.message);
    }
  }
  @Resolver()
  async subject(@Parent() user: UserDocument) {
    const result = await this.usersService.subjectSpecialization(user.id);

    return result.subject;
  }
}
