import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateMessageInput {
  @Field(() => String)
  input: string;
  @Field(() => String)
  sender: string;
  @Field(() => String)
  chat: string;
}
