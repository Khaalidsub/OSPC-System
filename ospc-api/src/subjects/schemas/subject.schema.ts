import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ISubject } from '../types';

export type SubjectDocument = Subject & Document;
@Schema()
// @MongoosePlugin(autopoulate)
export class Subject implements ISubject {
  @Prop()
  subjectName: string;
  @Prop()
  description: string;
}

export const SubjectSchema = SchemaFactory.createForClass(Subject);
