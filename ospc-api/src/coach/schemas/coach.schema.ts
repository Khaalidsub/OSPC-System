import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
import { Subject } from '../../subjects/schemas/subject.schema';

import { User } from '../../users/schemas/user.schema';
import { ISubjectDescription } from '../types';

export type SubjectSpecializationDocument = SubjectSpecialization & Document;

@Schema()
export class SubjectSpecialization {
  @Prop(
    raw([
      {
        title: { type: String },
        description: { type: String },
      },
    ]),
  )
  specialization: SubjectDescription[];
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Subject.name })
  subject: Subject;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
  coach: User;
}

@Schema()
export class SubjectDescription implements ISubjectDescription {
  @Prop()
  title: string;
  @Prop()
  description: string;
}

export const SubjectSpecializationSchema = SchemaFactory.createForClass(
  SubjectSpecialization,
);
