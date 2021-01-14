import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
import { User } from '../../users/schemas/user.schema';
import { IDepartment } from '../types';

export type DepartmentDocument = Department & Document;
@Schema()
// @MongoosePlugin(autopoulate)
export class Department implements IDepartment {
  @Prop()
  departmentName: string;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
  departmentModerator: User;
  @Prop()
  departmentDescription: string;
}

export const DepartmentSchema = SchemaFactory.createForClass(Department);
