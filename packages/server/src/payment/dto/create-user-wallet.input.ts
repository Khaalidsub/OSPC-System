import { Field, Float, InputType } from '@nestjs/graphql';
@InputType()
export class CreateUserWalletInput {
  @Field(() => String)
  user: string;
  @Field(() =>Float)
  balance: number
  
}
