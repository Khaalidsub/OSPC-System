import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Subject } from '../../subjects/entities/subject.entity';
import { User } from '../../users/entities/user.entity';
import { ILesson } from '../types';

@ObjectType()
export class Lesson implements ILesson {
  @Field(() => ID)
  id: string;
  @Field(() => User, { description: 'Example field (placeholder)' })
  student: User;
  @Field(() => Date)
  date: Date;
  @Field(() => Number)
  time_start: number; //hours and booking time is 45 minutes so start time 1->1:45
  @Field(() => Subject)
  subject: Subject;
  @Field(() => User)
  coach: User;
  @Field(() => Number)
  duration: number;
}
