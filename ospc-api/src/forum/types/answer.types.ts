import { InterfaceType, Field, ID, Int, InputType } from '@nestjs/graphql';
import { IUser } from 'src/users/types';
import { IQuestion as QuestionType } from './question.type';
const { IQuestion } = require('./question.type');
@InterfaceType()
@InputType('IAnswerType')
export class IAnswer {
  @Field(() => ID, { nullable: true })
  id?: string;
  @Field(() => IQuestion)
  question: QuestionType;
  @Field(() => String)
  input: string;
  @Field(() => Int)
  votes: number;
  @Field(() => Boolean, { nullable: true })
  isApproved: boolean;
  @Field(() => IUser, { nullable: true })
  user: IUser;
}
