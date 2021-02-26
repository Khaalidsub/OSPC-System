import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Department } from '../../departments/schema/department.schema';
import { IDepartment } from '../../departments/types';
import { ISubject } from '../types';
import * as mongoose from 'mongoose';
export type SubjectDocument = Subject & Document;
@Schema()
// @MongoosePlugin(autopoulate)
export class Subject implements ISubject {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Department.name })
  department: IDepartment;
  @Prop()
  subjectName: string;
  @Prop()
  description: string;
}

export const SubjectSchema = SchemaFactory.createForClass(Subject);
