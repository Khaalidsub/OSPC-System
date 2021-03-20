import { IUserWallet } from '@common/interfaces';
import { Field, Float, InputType, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User } from 'users/entities/user.entity';
import * as mongoose from 'mongoose';
import { Document } from 'mongoose';

export type UserWalletDocument = UserWallet & Document;
@ObjectType()
@Schema()
@InputType('UserWalletInputType')
export class UserWallet implements IUserWallet {
  @Field(() => String)
  id: string;
  @Field(() => Float)
  @Prop({ default: 0 })
  balance: number;
  @Field(() => User)
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
  user: string;
}

export const UserWalletSchema = SchemaFactory.createForClass(UserWallet);
