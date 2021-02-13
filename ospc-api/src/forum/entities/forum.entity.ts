import { Field, ObjectType } from '@nestjs/graphql';
import { User } from '../../users/entities/user.entity';
import { ISubject } from '../../subjects/types';
import { IUser } from '../../users/types';
import { IQuestion } from '../types/question.type';
import { Subject } from '../../subjects/entities/subject.entity';

@ObjectType({ implements: IQuestion })
export class Question implements IQuestion {
  id?: string;
  question: string;
  @Field(() => Subject)
  subject: ISubject;
  @Field(() => User)
  user: IUser;
}
