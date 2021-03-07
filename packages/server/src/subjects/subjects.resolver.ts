import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { SubjectsService } from './subjects.service';
import { Subject } from './entities/subject.entity';
import { CreateSubjectInput } from './dto/create-subject.input';
import { UpdateSubjectInput } from './dto/update-subject.input';
import {
  HttpException,
  HttpStatus,
  Logger,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ModeratorGuard } from '../auth/guards/graph-moderator.auth.guard';
import { GqlAuthGuard } from '../auth/guards/graph-auth.guard';
import { invalid, subjectNameError } from '../utils/exceptions';
import { SentryInterceptor } from '../Sentry';
@UseInterceptors(SentryInterceptor)
@Resolver(() => Subject)
export class SubjectsResolver {
  private readonly logger = new Logger(SubjectsResolver.name);
  constructor(private readonly subjectsService: SubjectsService) {}

  @Mutation(() => Subject)
  @UseGuards(GqlAuthGuard, ModeratorGuard)
  async createSubject(
    @Args('createSubjectInput') createSubjectInput: CreateSubjectInput,
  ) {
    try {
      await this.validate(createSubjectInput);
      return (
        await this.subjectsService.create(createSubjectInput)
      ).execPopulate();
    } catch (error) {
      throw new Error(error);
    }
  }

  async validate(createDepartmentInput: CreateSubjectInput) {
    const result = await this.subjectsService.findOne({
      subjectName: createDepartmentInput.subjectName,
    });
    if (result) {
      throw new HttpException(subjectNameError, HttpStatus.BAD_REQUEST);
    }
  }

  @Query(() => [Subject], { name: 'subjects' })
  findAll() {
    try {
      return this.subjectsService.findAll();
    } catch (error) {
      throw new HttpException(invalid, HttpStatus.BAD_REQUEST);
    }
  }

  @Query(() => Subject, { name: 'subject' })
  findOne(@Args('id', { type: () => String }) id: string) {
    try {
      return this.subjectsService.findOne(id);
    } catch (error) {
      throw new HttpException(invalid, HttpStatus.BAD_REQUEST);
    }
  }

  @Mutation(() => Subject)
  @UseGuards(GqlAuthGuard, ModeratorGuard)
  async updateSubject(
    @Args('updateSubjectInput') updateSubjectInput: UpdateSubjectInput,
  ) {
    try {
      const result = await this.subjectsService.update(
        updateSubjectInput.id,
        updateSubjectInput,
      );
      return result;
    } catch (error) {
      throw new HttpException(invalid, HttpStatus.BAD_REQUEST);
    }
  }

  @Mutation(() => Subject)
  @UseGuards(GqlAuthGuard, ModeratorGuard)
  removeSubject(@Args('id', { type: () => String }) id: string) {
    try {
      return this.subjectsService.remove(id);
    } catch (error) {
      throw new HttpException(invalid, HttpStatus.BAD_REQUEST);
    }
  }
}
