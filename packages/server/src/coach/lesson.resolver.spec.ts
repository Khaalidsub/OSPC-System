import { MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { UsersModule } from '../users/users.module';
import {
  closeInMongodConnection,
  rootMongooseTestModule,
} from '../utils/mongo';
import { CoachResolver } from './coach.resolver';
import {
  SubjectSpecialization,
  SubjectSpecializationSchema,
} from './entities/coach.entity';
import { Lesson, LessonSchema } from './entities/lesson.entity';
import {
  WeeklySchedule,
  WeeklyScheduleSchema,
} from './entities/schedule.entity';
import { LessonResolver } from './lesson.resolver';
import { LessonsService } from './lesson.service';
import { ScheduleService } from './schedule.service';
import { SubjectSpecializationService } from './specialization.service';

describe('Lesson Resolver', () => {
  let lessonResolver: LessonResolver;
  afterAll(() => {
    closeInMongodConnection();
  });
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        MongooseModule.forFeature([
          { name: Lesson.name, schema: LessonSchema },
          { name: WeeklySchedule.name, schema: WeeklyScheduleSchema },
          {
            name: SubjectSpecialization.name,
            schema: SubjectSpecializationSchema,
          },
        ]),
        UsersModule,
        rootMongooseTestModule(),
      ],
      providers: [
        CoachResolver,
        LessonResolver,
        LessonsService,
        ScheduleService,
        SubjectSpecializationService,
      ],
    }).compile();

    lessonResolver = module.get<LessonResolver>(LessonResolver);
  });

  describe('book a lesson', () => {
    it('should return a booked lesson', () => {});
  });
  describe('get the lessons', () => {
    it('should return all the lessons', () => {});
  });
});
