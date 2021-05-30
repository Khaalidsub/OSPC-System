import { ObjectType, Field, Int, InputType } from '@nestjs/graphql';
import { IChat, IUser } from '@common/interfaces';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
import { User } from 'users/entities/user.entity';
export type ChatDocument = Chat & Document;
@ObjectType()
@Schema({ timestamps: true})
@InputType('ChatInputType')
export class Chat implements IChat {
  @Field(() => String)
  id: string;
  @Field(() => Boolean)
  @Prop({ default: true })
  isOpen: boolean;
  @Field(() => [User])
  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: User.name }] })
  users: string[];
  // @Field(() => Int)
  // @Prop()
  chat_time: number;
  @Field(() => Int)
  @Prop({ default: 1 })
  duration: number;
  @Field(() =>Date,{nullable:true})
  createdAt: Date
  @Field(() =>Date)
  updatedAt:Date
}

export const ChatSchema = SchemaFactory.createForClass(Chat);
