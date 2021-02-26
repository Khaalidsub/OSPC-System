import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { IUser, Role, Status } from '../types';

export type UserDocument = User & Document;
@Schema()
// @MongoosePlugin(autopoulate)
export class User implements IUser {
  @Prop()
  email: string;
  @Prop()
  universityId: string;
  @Prop()
  university: string;
  @Prop()
  name: string;
  @Prop()
  description?: string;
  @Prop()
  password?: string;
  @Prop()
  phoneNumber: string;
  @Prop(Role)
  role: Role;
  @Prop({ default: Status.pending })
  accountStatus: Status;
  @Prop({ default: Status.inactive })
  coachingStatus?: Status;
  @Prop({ default: Status.inactive })
  moderatorStatus?: Status;
}

export const UserSchema = SchemaFactory.createForClass(User);
