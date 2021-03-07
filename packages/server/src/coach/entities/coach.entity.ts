import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import {
  ISubjectDescription,
  ISubjectSpecialization,
} from '@common/interfaces';
import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
import { Subject } from 'subjects/entities/subject.entity';
import { User } from 'users/entities/user.entity';

export type SubjectSpecializationDocument = SubjectSpecialization & Document;
@ObjectType()
@Schema()
export class SubjectDescription implements ISubjectDescription {
  @Field(() => String)
  title: string;
  @Field(() => String)
  description: string;
}
@ObjectType()
@Schema()
export class SubjectSpecialization implements ISubjectSpecialization {
  @Field(() => ID)
  id: string;
  @Field(() => [SubjectDescription])
  @Prop(raw([SubjectDescription]))
  specialization: SubjectDescription[];
  @Field(() => Subject)
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Subject.name })
  subject: Subject;
  @Field(() => User)
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
  coach: User;
}

export const SubjectSpecializationSchema = SchemaFactory.createForClass(
  SubjectSpecialization,
);
