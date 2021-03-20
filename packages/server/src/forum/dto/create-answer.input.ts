import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateAnswerInput {
  @Field(() => String)
  input: string;
  @Field(() => String)
  question: string;
}
