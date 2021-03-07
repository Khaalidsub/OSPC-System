import { Module } from '@nestjs/common';
import { SubjectsService } from './subjects.service';
import { SubjectsResolver } from './subjects.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { SubjectSchema, Subject } from './entities/subject.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Subject.name, schema: SubjectSchema }]),
  ],
  providers: [SubjectsResolver, SubjectsService],
})
export class SubjectsModule {}
