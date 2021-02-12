import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateAnswerInput {
  @Field(() => String)
  input: string;
  @Field(() => Int, { defaultValue: 0 })
  votes: number = 0;
}
