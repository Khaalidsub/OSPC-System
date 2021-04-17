import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { SubjectsService } from 'subjects/subjects.service';
import { UsersService } from 'users/users.service';
import { SubjectSpecialization } from './entities/coach.entity';
import { SubjectSpecializationService } from './specialization.service';

@Resolver(() => SubjectSpecialization)
export class SpecializationResolver {
  constructor(
    private subjectSepcializationService: SubjectSpecializationService,
    private usersService: UsersService,
    private subjectService: SubjectsService,
  ) {}

  @Query(() => [SubjectSpecialization])
  specializations() {
    try {
      return this.subjectSepcializationService.findAll();
    } catch (error) {
      throw new Error(error.message);
    }
  }
  @Query(() => SubjectSpecialization)
  getSpecialization(@Args('id') id: string) {
    try {
      return this.subjectSepcializationService.findById(id);
    } catch (error) {
      throw new Error(error.message);
    }
  }
  @Query(() => SubjectSpecialization)
  getUserSpecialization(@Args('id') id: string) {
    try {
      return this.subjectSepcializationService.findOne({ coach: id });
    } catch (error) {
      throw new Error(error.message);
    }
  }
  @Query(() => SubjectSpecialization)
  getSubjectsSpecialization(@Args('id') id: string) {
    try {
      return this.subjectSepcializationService.findByQuery({ subject: id });
    } catch (error) {
      throw new Error(error.message);
    }
  }

  @ResolveField()
  coach(@Parent() subjectSpecialization: SubjectSpecialization) {
    return this.usersService.findById(subjectSpecialization.coach);
  }
  @ResolveField()
  subject(@Parent() subjectSpecialization: SubjectSpecialization) {
    return this.subjectService.findById(subjectSpecialization.subject);
  }
}
