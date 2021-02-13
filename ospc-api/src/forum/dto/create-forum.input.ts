import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateQuestionInput {
  @Field(() => String, { description: '' })
  question: string;
  @Field(() => String)
  subject: string;
}
