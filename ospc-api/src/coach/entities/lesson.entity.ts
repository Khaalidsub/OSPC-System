import { Field, ObjectType } from '@nestjs/graphql';
import { Subject } from 'src/subjects/entities/subject.entity';
import { User } from 'src/users/entities/user.entity';
import { Days } from '../types';

@ObjectType()
export class Lesson {
  @Field(() => String, { description: 'Example field (placeholder)' })
  student: User;

  date: Date;
  time_start: number; //hours and booking time is 45 minutes so start time 1->1:45
  subject: Subject;
  coach: User;
}
