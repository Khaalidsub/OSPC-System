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
import { SubjectSpecialization } from 'coach/entities/coach.entity';
import { Subject } from 'subjects/entities/subject.entity';
import { hash, compare } from 'bcrypt';
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
  @Field(() => Number, { nullable: true })
  @Prop()
  phoneNumber: number;
  @Field(() => String, { nullable: true })
  @Prop()
  universityId: string;
  @Field(() => String)
  @Prop()
  university: string;
  @Field(() => Role, { nullable: true })
  @Prop({ default: Role.student })
  role: Role;
  @Field(() => Status, { nullable: true })
  @Prop({ default: Status.inactive })
  accountStatus: Status;
  @Field(() => Status, { nullable: true })
  @Prop({ default: Status.inactive })
  coachingStatus?: Status;
  @Field(() => Status)
  @Prop({ default: Status.inactive })
  moderatorStatus?: Status;

  @Field(() =>String)
  @Prop({default:'17d6a1697e8dcda04bd6ea1d8977effa1620991309510.png'})
  image:string;
  // @Field(() => Subject, {})
  // subject?: string;
  async hashPassword(): Promise<void> {
    this.password = await hash(this.password, 10);
  }
  async comparePassword(enteredPassword: string): Promise<boolean> {
    const result = await compare(enteredPassword, this.password);
    console.log(result);
    return result;
  }
}
registerEnumType(Role, { name: 'Role' });
registerEnumType(Status, { name: 'Status' });
registerEnumType(Status, { name: 'CoachingStatus' });

export const UserSchema = SchemaFactory.createForClass(User);
