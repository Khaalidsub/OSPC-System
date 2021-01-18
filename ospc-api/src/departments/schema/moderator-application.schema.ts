import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
import { IUser } from 'src/users/types';
import { User } from '../../users/schemas/user.schema';
import { IDepartment, IDepartmentModeratorApplication } from '../types';
import { Department } from './department.schema';

export type DepartmentModeratorApplicationDocument = DepartmentModeratorApplication &
  Document;
@Schema()
// @MongoosePlugin(autopoulate)
export class DepartmentModeratorApplication
  implements IDepartmentModeratorApplication {
  @Prop()
  description: string;
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: Department.name,
  })
  department: IDepartment;
  @Prop()
  resumeLinks: string[];
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: User.name,
  })
  user: IUser;
}

export const DepartmentModeratorApplicationSchema = SchemaFactory.createForClass(
  DepartmentModeratorApplication,
);
