import { Field, InputType } from '@nestjs/graphql';
import { Subject } from 'src/subjects/entities/subject.entity';
import { User } from 'src/users/entities/user.entity';
import { ILesson } from '../types';

@InputType()
export class CreateLessonInput implements ILesson {
  @Field(() => String)
  subject: string;
  @Field(() => String)
  coach: string;
  @Field(() => String)
  student?: string;
  @Field(() => Date)
  date: Date;
  @Field(() => Number)
  time_start: number;
  @Field(() => Number)
  duration: number;
}
