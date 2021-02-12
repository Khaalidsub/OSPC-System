import { InputType, ObjectType } from '@nestjs/graphql';
import { ISubject } from '../../subjects/types';
import { IUser } from '../../users/types';
import { IQuestion } from '../types';
import { Answer } from './answer.entity';

@ObjectType({ implements: IQuestion })
export class Question implements IQuestion {
  id?: string;
  answers: Answer[];
  correctAnswer: Answer;
  question: string;
  subject: ISubject;
  user: IUser;
}
