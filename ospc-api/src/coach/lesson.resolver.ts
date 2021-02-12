import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { LessonsService } from './lesson.service';
import { CurrentUser, GqlAuthGuard } from '../auth/guards/graph-auth.guard';
import { UseGuards } from '@nestjs/common';
import { User } from '../users/entities/user.entity';
import { Lesson } from './entities/lesson.entity';
import { CreateLessonInput } from './dto/create-lesson.input';

@Resolver(() => Lesson)
export class LessonResolver {
  constructor(private readonly lessonsService: LessonsService) {}

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
