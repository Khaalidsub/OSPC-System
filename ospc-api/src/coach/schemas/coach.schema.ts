import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
import { Subject } from '../../subjects/schemas/subject.schema';

import { User } from '../../users/schemas/user.schema';
import { ISubjectDescription, ISubjectSpecialization } from '../types';

export type SubjectSpecializationDocument = SubjectSpecialization & Document;

export class SubjectDescription implements ISubjectDescription {
  title: string;
  description: string;
}
@Schema()
export class SubjectSpecialization implements ISubjectSpecialization {
  @Prop(raw([SubjectDescription]))
  specialization: SubjectDescription[];
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Subject.name })
  subject: Subject;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
  coach: User;
}

export const SubjectSpecializationSchema = SchemaFactory.createForClass(
  SubjectSpecialization,
);
