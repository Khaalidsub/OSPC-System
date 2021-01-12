import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Subject } from 'src/subjects/entities/subject.entity';
import { User } from 'src/users/entities/user.entity';
import { Status } from 'src/users/types';
import { Schedule } from './schedule.entity';

@ObjectType()
export class SubjecSpecialization {
  @Field(() => [SubjectDescription])
  specialization: SubjectDescription[];
  @Field(() => Subject)
  subject: Subject;
}

@ObjectType()
export class SubjectDescription {
  @Field(() => String)
  title: string;
  @Field(() => String)
  description: string;
}
