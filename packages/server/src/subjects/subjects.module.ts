import { forwardRef, Module } from '@nestjs/common';
import { SubjectsService } from './subjects.service';
import { SubjectsResolver } from './subjects.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { SubjectSchema, Subject } from './entities/subject.entity';
import { DepartmentsModule } from 'departments/departments.module';
import { CoachModule } from 'coach/coach.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Subject.name, schema: SubjectSchema }]),
    forwardRef(() => DepartmentsModule),
    CoachModule,
  ],
  providers: [SubjectsResolver, SubjectsService],
  exports: [SubjectsService],
})
export class SubjectsModule {}
