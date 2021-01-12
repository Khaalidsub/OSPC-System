import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type SubjectDocument = Subject & Document;
@Schema()
// @MongoosePlugin(autopoulate)
export class Subject {
  @Prop()
  subjectName: string;
  @Prop()
  description: string;
}

export const SubjectSchema = SchemaFactory.createForClass(Subject);
