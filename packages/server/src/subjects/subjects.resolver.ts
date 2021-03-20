import {
  Resolver,
  Query,
  Mutation,
  Args,
  Parent,
  ResolveField,
} from '@nestjs/graphql';
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
import { ModeratorGuard } from 'auth/guards/graph-moderator.auth.guard';
import { GqlAuthGuard } from 'auth/guards/graph-auth.guard';
import { invalid, subjectNameError } from '@common/utils';
import { SentryInterceptor } from '../Sentry';
import { DepartmentsService } from 'departments/departments.service';
@UseInterceptors(SentryInterceptor)
@Resolver(() => Subject)
export class SubjectsResolver {
  private readonly logger = new Logger(SubjectsResolver.name);
  constructor(
    private readonly subjectsService: SubjectsService,
    private readonly departmentsService: DepartmentsService,
  ) {}

  @Mutation(() => Subject)
  // @UseGuards(GqlAuthGuard, ModeratorGuard)
  async createSubject(
    @Args('createSubjectInput') createSubjectInput: CreateSubjectInput,
  ) {
    try {
      return this.subjectsService.create(createSubjectInput);
    } catch (error) {
      throw new Error(error);
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
  // @UseGuards(GqlAuthGuard, ModeratorGuard)
  async updateSubject(
    @Args('id') id: string,
    @Args('updateSubjectInput') updateSubjectInput: UpdateSubjectInput,
  ) {
    try {
      return this.subjectsService.update(id, updateSubjectInput);
    } catch (error) {
      throw new HttpException(invalid, HttpStatus.BAD_REQUEST);
    }
  }

  @Mutation(() => Subject)
  // @UseGuards(GqlAuthGuard, ModeratorGuard)
  removeSubject(@Args('id', { type: () => String }) id: string) {
    try {
      return this.subjectsService.remove(id);
    } catch (error) {
      throw new HttpException(invalid, HttpStatus.BAD_REQUEST);
    }
  }
  @ResolveField()
  department(@Parent() subject: Subject) {
    return this.departmentsService.findById(subject.department);
  }
}
