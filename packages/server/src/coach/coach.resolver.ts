import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { ScheduleService } from './schedule.service';

import { AdminGuard } from 'auth/guards/graph-admin.auth.guard';
import { CurrentUser, GqlAuthGuard } from 'auth/guards/graph-auth.guard';
import {
  HttpException,
  HttpStatus,
  Logger,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from 'users/users.service';
import { User } from 'users/entities/user.entity';
import { SubjectSpecializationService } from './specialization.service';
import { CreateSubjecSpecialization } from './dto/create-coach.input';
import { CreateWeeklyScheduleInput } from './dto/create-schedule.input';
import { WeeklySchedule } from './entities/schedule.entity';
import { UpdateWeeklySchedule } from './dto/update-schedule.input';
import { SentryInterceptor } from '../Sentry';
import { Role, Status } from '@common/enums';
import {
  coachPendingError,
  studentPendingError,
  coachActiveError,
} from '@common/utils';
import { CreateCoachApplicationInput } from './dto/create-coach-application.input';
import { CoachApplicationService } from './coach-application.service';
import { EventEmitter2 } from '@nestjs/event-emitter';
@UseInterceptors(SentryInterceptor)
@Resolver(() => WeeklySchedule)
export class CoachResolver {
  private readonly logger = new Logger(CoachResolver.name);
  constructor(
    private readonly scheduleService: ScheduleService,
    private readonly usersService: UsersService,
    private readonly specializationService: SubjectSpecializationService,
    private readonly coachApplicationService: CoachApplicationService,
    private readonly eventEmitter: EventEmitter2,

  ) {}

  @Mutation(() => User)
  @UseGuards(GqlAuthGuard)
  async applyCoach(
    @CurrentUser() user: User,
    @Args('createSubjectSpecialization')
    createSubjectSpecialization: CreateSubjecSpecialization,
    @Args('createWeeklySchedule')
    createWeeklySchedule: CreateWeeklyScheduleInput,
    @Args('createCoachApplication')
    createCoachApplication: CreateCoachApplicationInput,
  ) {
    try {
      this.validateApplication(user);
      await this.usersService.update(user.id, {
        coachingStatus: Status.pending,
      });

      await this.specializationService.create({
        ...createSubjectSpecialization,
        coach: user.id,
      } as any);

      await this.scheduleService.create(({
        ...createWeeklySchedule,
        coach: user.id,
      } as unknown) as WeeklySchedule);

      const result = await this.coachApplicationService.save({
        ...createCoachApplication,
        user: user.id,
      });
      this.eventEmitter.emit('coach.created', user);

      return user;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  validateApplication(user: User) {
    if (user.coachingStatus === Status.pending) {
      throw new HttpException(coachPendingError, HttpStatus.BAD_REQUEST);
    }
    if (user.accountStatus == Status.pending) {
      throw new HttpException(studentPendingError, HttpStatus.BAD_REQUEST);
    }
    if (user.coachingStatus === Status.active) {
      throw new HttpException(coachActiveError, HttpStatus.BAD_REQUEST);
    }
  }

  @Mutation(() => User)
  @UseGuards(GqlAuthGuard, AdminGuard)
  async approveCoach(@Args('id', { type: () => String }) id: string) {
    try {
      const result = await this.usersService.update(id, {
        coachingStatus: Status.active,
        role: Role.coach,
      });
      this.eventEmitter.emit('coach.approved', result);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  @Query(() => WeeklySchedule)
  // @UseGuards(GqlAuthGuard)
  getCoachSchedule(@Args('id') id: string) {
    try {
      console.log('so you are what', id);

      return this.scheduleService.findOne({ coach: id });
    } catch (error) {
      throw new Error(error.message);
    }
  }
  @Query(() => WeeklySchedule)
  @UseGuards(GqlAuthGuard)
  getSchedule(@CurrentUser() user: User) {
    try {
      return this.scheduleService.findOne({ coach: user.id });
    } catch (error) {
      throw new Error(error.message);
    }
  }

  @Query(() => [WeeklySchedule])
  // @UseGuards(GqlAuthGuard)
  getSchedules() {
    try {
      return this.scheduleService.findAll();
    } catch (error) {
      throw new Error(error.message);
    }
  }

  @Mutation(() => WeeklySchedule)
  async updateWeeklySchedule(
    @Args('id') id: string,
    @Args('updateWeeklySchedule') updateWeeklySchedule: UpdateWeeklySchedule,
  ) {
    try {
      const result = await this.scheduleService.update(id, {
        ...updateWeeklySchedule,
      });
      return result;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  @ResolveField()
  coach(@Parent() weeklySchedule: WeeklySchedule) {
    return this.usersService.findById(weeklySchedule.coach);
  }
}
