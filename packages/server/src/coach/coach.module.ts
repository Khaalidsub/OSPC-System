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
import { SpecializationResolver } from './specialization.resolver';
import {
  CoachApplication,
  CoachApplicationSchema,
} from './entities/coach-application.entity';
import { CoachApplicationResolver } from './coach-application.resolver';
import { CoachApplicationService } from './coach-application.service';
import { PaymentModule } from '../payment/payment.module';

@Module({
  imports: [
    PaymentModule,
    MongooseModule.forFeature([
      { name: Lesson.name, schema: LessonSchema },
      { name: CoachApplication.name, schema: CoachApplicationSchema },
      { name: WeeklySchedule.name, schema: WeeklyScheduleSchema },
      { name: SubjectSpecialization.name, schema: SubjectSpecializationSchema },
    ]),
    UsersModule,
    forwardRef(() => SubjectsModule),
  ],
  providers: [
    CoachResolver,
    LessonResolver,
    LessonsService,
    CoachApplicationResolver,
    CoachApplicationService,
    SpecializationResolver,
    ScheduleService,
    SubjectSpecializationService,
  ],
  exports: [SubjectSpecializationService],
})
export class CoachModule {}
