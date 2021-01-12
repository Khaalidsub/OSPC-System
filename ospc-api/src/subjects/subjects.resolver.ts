import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { SubjectsService } from './subjects.service';
import { Subject } from './entities/subject.entity';
import { CreateSubjectInput } from './dto/create-subject.input';
import { UpdateSubjectInput } from './dto/update-subject.input';
import { UseGuards } from '@nestjs/common';
import { ModeratorGuard } from '../auth/guards/graph-moderator.auth.guard';
import { GqlAuthGuard } from '../auth/guards/graph-auth.guard';

@Resolver(() => Subject)
export class SubjectsResolver {
  constructor(private readonly subjectsService: SubjectsService) {}

  @Mutation(() => Subject)
  @UseGuards(GqlAuthGuard, ModeratorGuard)
  createSubject(
    @Args('createSubjectInput') createSubjectInput: CreateSubjectInput,
  ) {
    return this.subjectsService.create(createSubjectInput);
  }

  @Query(() => [Subject], { name: 'subjects' })
  findAll() {
    return this.subjectsService.findAll();
  }

  @Query(() => Subject, { name: 'subject' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.subjectsService.findOne(id);
  }

  @Mutation(() => Subject)
  @UseGuards(GqlAuthGuard, ModeratorGuard)
  updateSubject(
    @Args('updateSubjectInput') updateSubjectInput: UpdateSubjectInput,
  ) {
    return this.subjectsService.update(
      updateSubjectInput.id,
      updateSubjectInput,
    );
  }

  @Mutation(() => Subject)
  @UseGuards(GqlAuthGuard, ModeratorGuard)
  removeSubject(@Args('id', { type: () => String }) id: string) {
    return this.subjectsService.remove(id);
  }
}
