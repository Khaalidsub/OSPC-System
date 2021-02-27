import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {
  Field,
  ID,
  InputType,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';
import { IUser, Role, Status } from '../types';
import { Document } from 'mongoose';
export type UserDocument = User & Document;

@Schema()
@InputType('userType')
@ObjectType()
export class User implements IUser {
  @Field(() => ID, { nullable: true })
  id?: string;
  @Field(() => String)
  @Prop()
  name: string;
  @Field(() => String)
  @Prop()
  password?: string;
  @Field(() => String)
  @Prop()
  email: string;
  @Field(() => String)
  @Prop()
  phoneNumber: string;
  @Field(() => String)
  @Prop()
  universityId: string;
  @Field(() => String)
  @Prop()
  university: string;
  @Field(() => Role, { nullable: true, defaultValue: Role.student })
  @Prop({ default: Status.pending })
  role: Role;
  @Field(() => Status, { nullable: true, defaultValue: Status.pending })
  @Prop({ default: Status.inactive })
  accountStatus: Status;
  @Field(() => Status, { nullable: true, defaultValue: Status.inactive })
  @Prop({ default: Status.inactive })
  coachingStatus?: Status;
  @Field(() => Status)
  @Prop({ default: Status.inactive })
  moderatorStatus?: Status;
}
registerEnumType(Role, { name: 'Role' });
registerEnumType(Status, { name: 'Status' });
registerEnumType(Status, { name: 'CoachingStatus' });

export const UserSchema = SchemaFactory.createForClass(User);
