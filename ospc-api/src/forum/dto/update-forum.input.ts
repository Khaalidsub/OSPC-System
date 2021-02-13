import { Field, ID, InputType, PartialType } from '@nestjs/graphql';
import { ISubject } from '../../subjects/types';
import { IUser } from '../../users/types';
import { Question } from '../entities/forum.entity';
import { IAnswer, IQuestion } from '../types';

@InputType()
export class UpdateQuestionInput extends PartialType(Question, InputType) {
  @Field(() => [IAnswer])
  answers: IAnswer[];
  @Field(() => IAnswer)
  correctAnswer: IAnswer;
  @Field(() => String)
  question: string;
  @Field(() => ISubject)
  subject: ISubject;
  @Field(() => IUser)
  user: IUser;
  @Field(() => ID)
  id: string;
}
