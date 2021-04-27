import { Field, Float, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateTransactionInput {
  @Field(() => Float)
  date: number;
  @Field(() => Float)
  amount: number;
  @Field(() => String)
  currency: string;
  
}

export enum TransactionType {
  topup = 'topup',
  booking = 'booking',
  cashout = 'cashout',  
}

