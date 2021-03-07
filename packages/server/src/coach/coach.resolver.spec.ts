import { MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { UsersModule } from '../users/users.module';
import { UsersResolver } from '../users/users.resolver';
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

describe('CoachResolver', () => {
  let coachResolver: CoachResolver;

  let userResolver: UsersResolver;
  /// data

  afterEach(() => {
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
    coachResolver = module.get<CoachResolver>(CoachResolver);
  });

  describe('Apply Coach', () => {
    it('should return a pending coach', async () => {});
  });

  describe('Approve Coach', () => {
    it('should return an approved Coach', async () => {});
  });
  describe('Update WeeklySchedule', () => {
    it('should return an updated WeeklySchedule', async () => {});
  });
});
