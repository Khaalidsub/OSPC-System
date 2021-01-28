import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CoachService } from './coach.service';

import { Status } from '../users/types';
import { AdminGuard } from '../auth/guards/graph-admin.auth.guard';
import { GqlAuthGuard } from '../auth/guards/graph-auth.guard';
import { UseGuards } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { User } from '../users/entities/user.entity';

@Resolver(() => User)
export class CoachResolver {
  constructor(
    private readonly coachService: CoachService,
    private readonly usersService: UsersService,
  ) {}

  //apply as a coach
  @Mutation(() => Boolean)
  applyCoach(@Args('createCoachInput') createcoachInput: any) {
    return this.coachService.create(createcoachInput);
  }
  //approve coach

  @Mutation(() => Boolean)
  @UseGuards(GqlAuthGuard, AdminGuard)
  approveCoach(@Args('id', { type: () => String }) id: string) {
    return this.coachService.update(id, { status: Status.active });
  }

  //booking a lesson

  @Query(() => [User], { name: 'coach' })
  findAll() {
    return this.coachService.findAll();
  }

  @Query(() => User, { name: 'coach' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.coachService.findOne(id);
  }

  @Mutation(() => User)
  updateCoach(@Args('updateCoachInput') updateCoachInput: any) {
    return this.coachService.update(updateCoachInput.id, updateCoachInput);
  }
}
