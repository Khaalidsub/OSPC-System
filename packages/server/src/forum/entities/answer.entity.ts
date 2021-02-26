import { Field, ObjectType } from '@nestjs/graphql';
import { User } from '../../users/entities/user.entity';
import { IUser } from '../../users/types';
import { IAnswer } from '../types/answer.types';
import { IQuestion } from '../types/question.type';
import { Question } from './forum.entity';

@ObjectType({ implements: IAnswer })
export class Answer implements IAnswer {
  id?: string;
  @Field(() => Question)
  question: IQuestion;
  input: string;
  votes: number;
  isApproved: boolean;
  @Field(() => User)
  user: IUser;
}
