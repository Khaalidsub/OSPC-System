import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IAnswer } from '../types';
import * as mongoose from 'mongoose';

import { Document } from 'mongoose';
import { User } from '../../users/schemas/user.schema';
export type AnswerDocument = Answer & Document;
@Schema()
export class Answer implements IAnswer {
  @Prop()
  input: string;
  @Prop()
  votes: number;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
  user: User;
}

export const AnswerSchema = SchemaFactory.createForClass(Answer);
