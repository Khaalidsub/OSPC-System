import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IAnswer, IQuestion } from '../types';
import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
import { User } from '../../users/schemas/user.schema';
import { ISubject } from 'src/subjects/types';
import { IUser } from 'src/users/types';
import { Answer } from './answer.schema';
import { Subject } from 'src/subjects/schemas/subject.schema';
export type QuestionDocument = Question & Document;
@Schema()
export class Question implements IQuestion {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
  user: IUser;
  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: Answer.name }] })
  answers: IAnswer[];
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Answer.name })
  correctAnswer: IAnswer;
  @Prop()
  question: string;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Subject.name })
  subject: ISubject;
}

export const QuestionSchema = SchemaFactory.createForClass(Question);
