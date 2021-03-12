import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IChat, IMessage, IUser } from '@common/interfaces';
import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
import { Field, ID, InputType, ObjectType } from '@nestjs/graphql';
import { User } from 'users/entities/user.entity';
import { Chat } from './chat.entity';
export type MessageDocument = Message & Document;
@ObjectType()
@Schema()
@InputType('MessageInputType')
export class Message implements IMessage {
  @Field(() => ID)
  id: string;
  @Field(() => User)
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
  sender: User | string;
  @Field(() => Chat)
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Chat.name })
  chat: Chat | string;
  @Field(() => String)
  @Prop()
  input: string;
}
export const MessageSchema = SchemaFactory.createForClass(Message);
