import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
import { User } from 'users/entities/user.entity';
import { Subject } from 'subjects/entities/subject.entity';
import { ILesson } from '@common/interfaces';
import { Days } from '@common/enums';
export type LessonDocument = Lesson & Document;

registerEnumType(Days, { name: 'Day' });
@ObjectType()
@Schema({ timestamps: true })
export class Lesson implements ILesson {
  @Field(() => ID, { name: 'id' })
  _id: string;
  @Field(() => Days)
  @Prop(Days)
  day: Days;
  @Field(() => User, { description: 'Example field (placeholder)' })
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
  student: string;
  @Field(() => Number)
  @Prop()
  date: number;
  @Field(() => Number)
  @Prop()
  time_start: number; //hours and booking time is 45 minutes so start time 1->1:45
  @Field(() => Subject)
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Subject.name })
  subject: string;
  @Field(() => User)
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
  coach: string;
  @Field(() => Number)
  @Prop()
  duration: number;

  @Field()
  createdAt: Date;
  @Field()
  updatedAt: Date;
}

export const LessonSchema = SchemaFactory.createForClass(Lesson);
