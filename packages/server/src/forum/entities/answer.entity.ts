import { Field, ID, InputType, Int, ObjectType } from '@nestjs/graphql';
import { IAnswer, IUser } from '@common/interfaces';
import { User } from 'users/entities/user.entity';
import { Question } from './forum.entity';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';

export type AnswerDocument = Answer & Document;
@ObjectType()
@Schema()
@InputType('AnswerInputType')
export class Answer implements IAnswer {
  @Field(() => ID)
  id: string;
  @Field(() => Question)
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Question.name })
  question: Question;
  @Field(() => String)
  @Prop()
  input: string;
  @Field(() => Int)
  @Prop()
  votes: number;
  @Field(() => Boolean)
  @Prop()
  isApproved: boolean;
  @Field(() => User)
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
  user: User;
}

export const AnswerSchema = SchemaFactory.createForClass(Answer);
