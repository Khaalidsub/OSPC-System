import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { LessonsService } from './lesson.service';
import { CurrentUser, GqlAuthGuard } from '../auth/guards/graph-auth.guard';
import {
  HttpException,
  HttpStatus,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { User } from '../users/entities/user.entity';
import { Lesson, LessonDocument } from './entities/lesson.entity';
import { CreateLessonInput } from './dto/create-lesson.input';
import { ScheduleService } from './schedule.service';
import { SentryInterceptor } from '../Sentry';
import {
  invalidSelectedTimeError,
  lessonUnavailableError,
} from '@common/utils';
@UseInterceptors(SentryInterceptor)
@Resolver(() => Lesson)
export class LessonResolver {
  constructor(
    private readonly lessonsService: LessonsService,
    private readonly scheduleService: ScheduleService,
  ) {}

  @Mutation(() => Lesson)
  @UseGuards(GqlAuthGuard)
  async bookLesson(
    @CurrentUser() user: User,
    @Args('createLessonInput') createLessonInput: CreateLessonInput,
  ) {
    try {
      await this.validateSchedule(createLessonInput);
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
    const lessons = await this.lessonsService.findByQuery({
      time_start: createLessonInput.time_start,
      coach: createLessonInput.coach,
      subject: createLessonInput.subject,
    });

    if (lessons.length > 1) {
      this.compareLessonDates(
        this.convertEpochTime(createLessonInput.date),
        lessons,
      );
    }
  }

  async validateSchedule({
    coach,
    time_start,
    day,
    duration,
  }: CreateLessonInput) {
    const weeklySchedule = await this.scheduleService.findOne({ coach });

    if (
      weeklySchedule.schedule.find((schedule) =>
        schedule.day === day
          ? schedule.time_start > time_start ||
            time_start + duration > schedule.time_end
          : false,
      )
    )
      throw new HttpException(invalidSelectedTimeError, HttpStatus.BAD_REQUEST);
  }

  convertEpochTime(epochDate: number) {
    const newDate = new Date(0);
    newDate.setSeconds(epochDate);
    const monthDateAndYear =
      newDate.getMonth() + newDate.getDate() + newDate.getFullYear();
    return monthDateAndYear;
  }

  compareLessonDates(convertedEpochTime: number, lessons: LessonDocument[]) {
    if (
      lessons.find(
        (lesson) => convertedEpochTime === this.convertEpochTime(lesson.date),
      )
    ) {
      throw new HttpException(lessonUnavailableError, HttpStatus.BAD_REQUEST);
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
