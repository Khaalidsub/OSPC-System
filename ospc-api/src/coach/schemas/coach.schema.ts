import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
import { Subject } from 'src/subjects/schemas/subject.schema';

import { User } from '../../users/schemas/user.schema';
import { SubjectDescription } from '../entities/coach.entity';

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

// @Schema()
// // @MongoosePlugin(autopoulate)
// export class SubjectSpecialization {
//   //   @Prop()
//   //   user: User;
//   @Prop({ enum: Status, default: Status.pending })
//   status: Status;
//   @Prop()
//   description: string;
//   @Prop({
//     type: [{ type: mongoose.Schema.Types.ObjectId, ref: Schedule.name }],
//   })
//   weeklySchedule: Schedule[];

//   @Prop([SubjecSpecialization])
//   subjects: SubjecSpecialization[];
// }

export const SubjectSpecializationSchema = SchemaFactory.createForClass(
  SubjectSpecialization,
);
