import { Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import {
  CoachApplication,
  CoachApplicationDocument,
} from './entities/coach-application.entity';
@Resolver(() => CoachApplication)
export class CoachApplicationResolver {
  constructor() {}
  @Query(() => CoachApplication, { name: 'coachApplication' })
  async coachApplication() {
    return;
  }
  @ResolveField()
  async user(@Parent() coachApplication: CoachApplicationDocument) {
    const result = await coachApplication.populate('user').execPopulate();
    return result.user;
  }
}
