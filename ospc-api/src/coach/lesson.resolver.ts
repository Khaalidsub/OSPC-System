import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { LessonsService } from './lesson.service';

import { Status } from '../users/types';
import { AdminGuard } from '../auth/guards/graph-admin.auth.guard';
import { CurrentUser, GqlAuthGuard } from '../auth/guards/graph-auth.guard';
import { Logger, UseGuards } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { User } from '../users/entities/user.entity';
import { Lesson } from './entities/lesson.entity';
import { CreateLessonInput } from './dto/create-lesson.input';

@Resolver(() => Lesson)
export class LessonResolver {
  private readonly logger = new Logger(LessonResolver.name);
  constructor(
    private readonly lessonsService: LessonsService,
    private readonly usersService: UsersService,
  ) {}

  //book a lesson
  @Mutation(() => Lesson)
  @UseGuards(GqlAuthGuard)
  bookLesson(
    @CurrentUser() user: User,
    @Args('createLessonInput') createcoachInput: CreateLessonInput,
  ) {
    try {
      return this.lessonsService.create({
        ...createcoachInput,
        student: user.id,
      });
    } catch (error) {
      throw new Error(error.message);
    }
  }
  @Query(() => [Lesson])
  @UseGuards(GqlAuthGuard)
  getLessons(@CurrentUser() user: User) {
    try {
      return this.lessonsService.findByQuery({ student: user.id });
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
