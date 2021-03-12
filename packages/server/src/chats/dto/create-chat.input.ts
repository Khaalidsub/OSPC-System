import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateChatInput {
  @Field(() => [String])
  users: string[];
  @Field(() => Int)
  chat_time: number;
}
