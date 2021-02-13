import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Subject } from '../../subjects/entities/subject.entity';
import { Days, ILesson } from '../types';
import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
import { User } from '../../users/schemas/user.schema';
export type LessonDocument = Lesson & Document;
@Schema()
export class Lesson implements ILesson {
  @Prop(Days)
  day: Days;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Subject.name })
  subject: Subject;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
  coach: User;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
  student: User;
  @Prop()
  date: number;
  @Prop({ maxlength: 5 })
  time_start: number;
  @Prop()
  duration: number;
}

export const LessonSchema = SchemaFactory.createForClass(Lesson);
