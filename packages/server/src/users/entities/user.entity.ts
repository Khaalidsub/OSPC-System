import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {
  Field,
  ID,
  InputType,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';
import { Document } from 'mongoose';
import { Role, Status } from '@common/enums';
import { IUser } from '@common/interfaces';
export type UserDocument = User & Document;

@Schema()
@InputType('UserInputType')
@ObjectType()
export class User implements IUser {
  @Field(() => ID, { nullable: true })
  id?: string;
  @Field(() => String)
  @Prop()
  name: string;
  @Prop()
  password: string;
  @Field(() => String)
  @Prop({ unique: true })
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
  @Prop({ default: Role.student })
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
