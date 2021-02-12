import { Field, ID, InputType, Int, InterfaceType } from '@nestjs/graphql';
import { ISubject } from '../../subjects/types';
import { IUser } from '../../users/types';

@InterfaceType()
@InputType('IAnswerType')
export abstract class IAnswer {
  @Field(() => ID, { nullable: true })
  id?: string;
  @Field(() => String)
  input: string;
  @Field(() => Int)
  votes: number;
  @Field(() => IUser, { nullable: true })
  user: IUser;
}
@InterfaceType()
export abstract class IQuestion {
  @Field(() => ID, { nullable: true })
  id?: string;
  @Field(() => [IAnswer])
  answers: IAnswer[];
  @Field(() => IAnswer)
  correctAnswer: IAnswer;
  @Field(() => String)
  question: string;
  @Field(() => ISubject)
  subject: ISubject;
  @Field(() => IUser, { nullable: true })
  user: IUser;
}
