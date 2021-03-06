import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IChat, IMessage, IUser } from '@common/interfaces';
import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
import { Field, ID, InputType, ObjectType } from '@nestjs/graphql';
import { User } from 'users/entities/user.entity';
import { Chat } from './chat.entity';
export type MessageDocument = Message & Document;
@ObjectType()
@Schema({timestamps: true})
@InputType('MessageInputType')
export class Message implements IMessage {
  @Field(() => ID)
  id: string;
  @Field(() => User)
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
  sender: string;
  @Field(() => Chat)
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Chat.name })
  chat: string;
  @Field(() => String)
  @Prop()
  input: string;
  @Field(() =>Date)
  createdAt: Date;
  @Field(() =>Date)
  updatedAt: Date;
}
export const MessageSchema = SchemaFactory.createForClass(Message);
