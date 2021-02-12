import { InputType, ObjectType } from '@nestjs/graphql';
import { ISubject } from '../../subjects/types';
import { IUser } from '../../users/types';
import { IAnswer, IQuestion } from '../types';

@ObjectType({ implements: IQuestion })
export class Question implements IQuestion {
  id?: string;
  answers: IAnswer[];
  correctAnswer: IAnswer;
  question: string;
  subject: ISubject;
  user: IUser;
}
