import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

import { Document } from 'mongoose';
import { User } from '../../users/schemas/user.schema';
import { IAnswer } from '../types/answer.types';
import { IQuestion } from '../types/question.type';
import { Question } from './question.schema';
export type AnswerDocument = Answer & Document;
@Schema()
export class Answer implements IAnswer {
  id?: string;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Question.name })
  question: IQuestion;
  @Prop()
  input: string;
  @Prop({ default: false })
  isApproved: boolean;
  @Prop()
  votes: number;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
  user: User;
}

export const AnswerSchema = SchemaFactory.createForClass(Answer);
