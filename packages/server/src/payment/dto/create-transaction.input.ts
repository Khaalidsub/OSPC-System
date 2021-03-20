import { Field, Float, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateTransactionInput {
  @Field(() => String)
  user: string;
  @Field(() => Int)
  date: number;
  @Field(() => Float)
  amount: number;
}
