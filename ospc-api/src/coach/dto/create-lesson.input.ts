import { Field, InputType, Int } from '@nestjs/graphql';
import { Subject } from 'src/subjects/entities/subject.entity';
import { User } from 'src/users/entities/user.entity';
import { ILesson } from '../types';

@InputType()
export class CreateLessonInput implements ILesson {
  @Field(() => String)
  subject: string;
  @Field(() => String)
  coach: string;
  @Field(() => Date)
  date: Date;
  @Field(() => Int)
  time_start: number;
  @Field(() => Int, { defaultValue: 1 })
  duration: number;
}
