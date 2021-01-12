import { Module } from '@nestjs/common';
import { SubjectsService } from './subjects.service';
import { SubjectsResolver } from './subjects.resolver';
import { Subject, SubjectSchema } from './schemas/subject.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Subject.name, schema: SubjectSchema }]),
  ],
  providers: [SubjectsResolver, SubjectsService],
})
export class SubjectsModule {}
