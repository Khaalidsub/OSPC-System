import { Field, InputType } from '@nestjs/graphql';
import { Subject } from 'src/subjects/entities/subject.entity';
import { User } from 'src/users/entities/user.entity';
import { ILesson } from '../types';

@InputType()
export class CreateLessonInput implements ILesson {
  @Field(() => Subject)
  subject: Subject;
  @Field(() => User)
  coach: User;
  @Field(() => User)
  student: User;
  @Field(() => Date)
  date: Date;
  @Field(() => Number)
  time_start: number;
  @Field(() => Number)
  duration: number;
}
