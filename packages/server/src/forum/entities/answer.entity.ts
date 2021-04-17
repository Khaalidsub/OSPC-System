import { Field, ID, InputType, Int, ObjectType } from '@nestjs/graphql';
import { IAnswer, IUser } from '@common/interfaces';
import { User } from 'users/entities/user.entity';
import { Question } from './forum.entity';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Date, Document } from 'mongoose';
import * as mongoose from 'mongoose';

export type AnswerDocument = Answer & Document;
@ObjectType()
@Schema({ timestamps: true })
@InputType('AnswerInputType')
export class Answer implements IAnswer {
  @Field(() => ID)
  id: string;
  @Field(() => Question)
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Question.name })
  question: string;
  @Field(() => String)
  @Prop()
  input: string;
  @Field(() => Number)
  @Prop({ default: 0 })
  votes: number;
  @Field(() => Boolean)
  @Prop({ default: false })
  isApproved: boolean;
  @Field(() => User)
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
  user: string;
  @Field(() => Date)
  createdAt: Date;
  @Field(() => Date)
  updatedAt: Date;
}

export const AnswerSchema = SchemaFactory.createForClass(Answer);
