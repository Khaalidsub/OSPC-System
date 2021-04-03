import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
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
import { UsersService } from 'users/users.service';
import { SubjectsService } from 'subjects/subjects.service';
import { EventEmitter2 } from 'eventemitter2';
@UseInterceptors(SentryInterceptor)
@Resolver(() => Lesson)
export class LessonResolver {
  constructor(
    private readonly lessonsService: LessonsService,
    private readonly scheduleService: ScheduleService,
    private readonly usersService: UsersService,
    private readonly subjectsService: SubjectsService,
    private eventEmitter: EventEmitter2,
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

      const lesson = await this.lessonsService.create({
        ...createLessonInput,
        student: user.id,
      } as any);

      this.eventEmitter.emit('lesson.booked', lesson);
      return lesson;
    } catch (error) {
      throw new Error(error.message);
    }
  }
  @Query(() => [Lesson])
  getBookedLessonsOfTheWeek(
    @Args('dateFrom') dateFrom: number,
    @Args('dateTo') dateTo: number,
    @Args('coach') id: string,
  ) {
    try {
      //get the day
      console.log(
        this.convertEpochTime(dateFrom),
        this.convertEpochTime(dateTo),
      );

      //create a range from that day to 7 days later
      //get the lessons of those days with the coach id
      return this.lessonsService.getBookedLessonsOfTheWeek(
        dateFrom,
        dateTo,
        id,
      );
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

    if (lessons.length >= 1) {
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
  @ResolveField()
  student(@Parent() lesson: Lesson) {
    return this.usersService.findById(lesson.student);
  }
  @ResolveField()
  subject(@Parent() lesson: Lesson) {
    return this.subjectsService.findById(lesson.subject);
  }
  @ResolveField()
  coach(@Parent() lesson: Lesson) {
    return this.usersService.findById(lesson.coach);
  }
}
