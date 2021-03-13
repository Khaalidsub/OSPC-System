import { Field, InputType } from '@nestjs/graphql';
@InputType()
export class CreateUserWalletInput {
  @Field(() => String)
  user: string;
}
