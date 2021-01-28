import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ScheduleService } from './schedule.service';

import { Status } from '../users/types';
import { AdminGuard } from '../auth/guards/graph-admin.auth.guard';
import { CurrentUser, GqlAuthGuard } from '../auth/guards/graph-auth.guard';
import { Logger, UseGuards } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { User } from '../users/entities/user.entity';
import { SubjectSpecializationService } from './specialization.service';
import { CreateSubjecSpecialization } from './dto/create-coach.input';
import { CreateWeeklyScheduleInput } from './dto/create-schedule.input';
import { WeeklySchedule } from './entities/schedule.entity';
import { UpdateWeeklySchedule } from './dto/update-schedule.input';

@Resolver(() => User)
export class CoachResolver {
  private readonly logger = new Logger(CoachResolver.name);
  constructor(
    private readonly scheduleService: ScheduleService,
    private readonly usersService: UsersService,
    private readonly specializationService: SubjectSpecializationService,
  ) {}
  //apply as a coach
  @Mutation(() => User)
  @UseGuards(GqlAuthGuard)
  async applyCoach(
    @CurrentUser() user: User,
    @Args('createSubjectSpecialization')
    createSubjectSpecialization: CreateSubjecSpecialization,
    @Args('createWeeklySchedule')
    createWeeklySchedule: CreateWeeklyScheduleInput,
  ) {
    try {
      await this.specializationService.create({
        ...createSubjectSpecialization,
        coach: user.id,
      });
      await this.scheduleService.create({
        ...createWeeklySchedule,
        coach: user.id,
      });
      user.coachingStatus = Status.pending;
      await this.usersService.update(user.id, {
        coachingStatus: Status.pending,
      });
      return user;
    } catch (error) {
      throw new Error(error.message);
    }
  }
  //approve coach
  @Mutation(() => User)
  @UseGuards(GqlAuthGuard, AdminGuard)
  approveCoach(@Args('id', { type: () => String }) id: string) {
    try {
      return this.usersService.update(id, { coachingStatus: Status.active });
    } catch (error) {
      throw new Error(error.message);
    }
  }
  //update weekly
  @Mutation(() => WeeklySchedule)
  async updateWeeklySchedule(
    @Args('updateWeeklySchedule') updateWeeklySchedule: UpdateWeeklySchedule,
  ) {
    try {
      await this.scheduleService.update(updateWeeklySchedule.id, {
        ...updateWeeklySchedule,
      });
      return updateWeeklySchedule;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
