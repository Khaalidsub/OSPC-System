import { forwardRef, Module } from '@nestjs/common';
import { CoachResolver } from './coach.resolver';
import { UsersModule } from '../users/users.module';
import { LessonResolver } from './lesson.resolver';
import { ScheduleService } from './schedule.service';
import { SubjectSpecializationService } from './specialization.service';
import { MongooseModule } from '@nestjs/mongoose';
import {
  WeeklySchedule,
  WeeklyScheduleSchema,
} from './entities/schedule.entity';
import { LessonsService } from './lesson.service';
import { Lesson, LessonSchema } from './entities/lesson.entity';
import {
  SubjectSpecialization,
  SubjectSpecializationSchema,
} from './entities/coach.entity';
import { SubjectsModule } from 'subjects/subjects.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Lesson.name, schema: LessonSchema },
      { name: WeeklySchedule.name, schema: WeeklyScheduleSchema },
      { name: SubjectSpecialization.name, schema: SubjectSpecializationSchema },
    ]),
    UsersModule,
    SubjectsModule,
  ],
  providers: [
    CoachResolver,
    LessonResolver,
    LessonsService,
    ScheduleService,
    SubjectSpecializationService,
  ],
})
export class CoachModule {}
