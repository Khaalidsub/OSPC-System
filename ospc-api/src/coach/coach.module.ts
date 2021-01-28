import { forwardRef, Module } from '@nestjs/common';
import { CoachResolver } from './coach.resolver';
import { UsersModule } from 'src/users/users.module';
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

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Lesson.name, schema: LessonSchema },
      { name: WeeklySchedule.name, schema: WeeklyScheduleSchema },
      { name: SubjectSpecialization.name, schema: SubjectSpecializationSchema },
    ]),
    forwardRef(() => UsersModule),
  ],
  providers: [
    CoachResolver,
    LessonResolver,
    ScheduleService,
    SubjectSpecializationService,
  ],
})
export class CoachModule {}
