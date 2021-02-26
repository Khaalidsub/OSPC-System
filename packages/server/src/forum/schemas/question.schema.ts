import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
import { User } from '../../users/schemas/user.schema';
import { ISubject } from '../../subjects/types';
import { IUser } from '../../users/types';
import { Subject } from '../../subjects/schemas/subject.schema';
import { IQuestion } from '../types/question.type';
export type QuestionDocument = Question & Document;
@Schema()
export class Question implements IQuestion {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
  user: IUser;
  @Prop()
  question: string;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Subject.name })
  subject: ISubject;
}

export const QuestionSchema = SchemaFactory.createForClass(Question);
