import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
import { User } from '../../users/schemas/user.schema';

export type DepartmentDocument = Department & Document;
@Schema()
// @MongoosePlugin(autopoulate)
export class Department {
  @Prop()
  departmentName: string;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
  departmentModerator: User;
}

export const DepartmentSchema = SchemaFactory.createForClass(Department);
