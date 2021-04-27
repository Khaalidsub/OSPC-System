import { Field, Float, InputType, Int, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User } from 'users/entities/user.entity';
import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
import { ITransactionHistory } from '@common/interfaces';
import { TransactionType } from '../dto/create-transaction.input';

export type TransactionHistoryDocument = TransactionHistory & Document;
@ObjectType()
@Schema({ timestamps: true })
@InputType('TransactionHistoryInputType')
export class TransactionHistory implements ITransactionHistory {
  @Field(() => String)
  id: string;
  @Field(() => User)
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
  user: string;
  @Field(() => Float)
  date: number;
  @Field(() => Float)
  @Prop()
  amount: number;

  @Field(() =>String)
  @Prop()
  currency: string;//
  @Field(() => Date)
  createdAt: Date;
  @Field(() => Date)
  updatedAt: Date;
  @Field(() =>TransactionType)
  @Prop(TransactionType)
  transactionType: TransactionType
}

export const TransactionHistorySchema = SchemaFactory.createForClass(
  TransactionHistory,
);
registerEnumType(TransactionType,{
  name: 'TransactionType'
})