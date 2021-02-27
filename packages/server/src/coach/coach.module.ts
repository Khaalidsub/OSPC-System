import { forwardRef, Module } from '@nestjs/common';
import { CoachResolver } from './coach.resolver';
import { UsersModule } from '../users/users.module';
import { LessonResolver } from './lesson.resolver';
import { ScheduleService } from './schedule.service';
import { SubjectSpecializationService } from './specialization.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Lesson, LessonSchema } from './schemas/lesson.schema';
import { WeeklySchedule } from './entities/schedule.entity';
import { WeeklyScheduleSchema } from './schemas/schedule.schema';
import {
  SubjectSpecialization,
  SubjectSpecializationSchema,
} from './schemas/coach.schema';
import { LessonsService } from './lesson.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Lesson.name, schema: LessonSchema },
      { name: WeeklySchedule.name, schema: WeeklyScheduleSchema },
      { name: SubjectSpecialization.name, schema: SubjectSpecializationSchema },
    ]),
    UsersModule,
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
