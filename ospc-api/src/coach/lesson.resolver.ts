import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { LessonsService } from './lesson.service';
import { CurrentUser, GqlAuthGuard } from '../auth/guards/graph-auth.guard';
import { HttpException, HttpStatus, UseGuards } from '@nestjs/common';
import { User } from '../users/entities/user.entity';
import { Lesson } from './entities/lesson.entity';
import { CreateLessonInput } from './dto/create-lesson.input';

@Resolver(() => Lesson)
export class LessonResolver {
  constructor(private readonly lessonsService: LessonsService) {}

  @Mutation(() => Lesson)
  @UseGuards(GqlAuthGuard)
  async bookLesson(
    @CurrentUser() user: User,
    @Args('createLessonInput') createLessonInput: CreateLessonInput,
  ) {
    try {
      await this.validateLesson(createLessonInput);
      return (
        await this.lessonsService.create({
          ...createLessonInput,
          student: user.id,
        } as any)
      ).execPopulate();
    } catch (error) {
      throw new Error(error.message);
    }
  }
  async validateLesson(createLessonInput: CreateLessonInput) {
    const [lesson] = await this.lessonsService.findByQuery({
      time_start: createLessonInput.time_start,
    });
    if (lesson) {
      throw new HttpException(
        'Lesson has been booked before',
        HttpStatus.BAD_REQUEST,
      );
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
