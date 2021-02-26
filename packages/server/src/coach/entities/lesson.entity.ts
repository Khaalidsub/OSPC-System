import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { ISubject } from '../../subjects/types';
import { Subject } from '../../subjects/entities/subject.entity';
import { User } from '../../users/entities/user.entity';
import { Days, ILesson } from '../types';

@ObjectType({ implements: ILesson })
export class Lesson implements ILesson {
  day: Days;
  @Field(() => ID)
  id: string;
  @Field(() => User, { description: 'Example field (placeholder)' })
  student: User;
  @Field(() => Int)
  date: number;
  @Field(() => Int)
  time_start: number; //hours and booking time is 45 minutes so start time 1->1:45
  @Field(() => ISubject)
  subject: ISubject;
  @Field(() => User)
  coach: User;
  @Field(() => Int)
  duration: number;
}
