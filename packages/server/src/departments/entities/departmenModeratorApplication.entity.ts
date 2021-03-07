import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {
  IDepartment,
  IDepartmentModeratorApplication,
  IUser,
} from '@common/interfaces';
import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
import { Department } from './department.entity';
import { User } from 'users/entities/user.entity';
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
