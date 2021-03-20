import { Field, Float, InputType, Int, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User } from 'users/entities/user.entity';
import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
import { ITransactionHistory } from '@common/interfaces';

export type TransactionHistoryDocument = TransactionHistory & Document;
@ObjectType()
@Schema()
@InputType('TransactionHistoryInputType')
export class TransactionHistory implements ITransactionHistory {
  @Field(() => String)
  id: string;
  @Field(() => User)
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
  user: string;
  @Field(() => Int)
  date: number;
  @Field(() => Float)
  @Prop()
  amount: number;
}

export const TransactionHistorySchema = SchemaFactory.createForClass(
  TransactionHistory,
);
