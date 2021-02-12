import { Field, ID, InputType, Int, PartialType } from '@nestjs/graphql';
import { IUser } from 'src/users/types';
import { Answer } from '../entities/answer.entity';

@InputType()
export class UpdateAnswerInput extends PartialType(Answer, InputType) {
  @Field(() => String)
  input: string;
  @Field(() => Int)
  votes: number;
  @Field(() => IUser)
  user: IUser;
  @Field(() => ID)
  id: string;
}
