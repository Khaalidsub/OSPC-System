import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateQuestionInput {
  @Field(() => String, { description: '' })
  title: string;
  @Field(() => String, { description: '' })
  body: string;
  @Field(() => String)
  subject: string;
}
