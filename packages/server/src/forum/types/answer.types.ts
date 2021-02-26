import { InterfaceType, Field, ID, Int, InputType } from '@nestjs/graphql';
import { IUser } from '../../users/types';
import { IQuestion } from './question.type';
@InterfaceType()
@InputType('IAnswerType')
export class IAnswer {
  @Field(() => ID, { nullable: true })
  id?: string;
  @Field(() => IQuestion)
  question: IQuestion;
  @Field(() => String)
  input: string;
  @Field(() => Int)
  votes: number;
  @Field(() => Boolean, { nullable: true })
  isApproved: boolean;
  @Field(() => IUser, { nullable: true })
  user: IUser;
}
