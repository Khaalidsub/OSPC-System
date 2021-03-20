import { Field, ID, InputType, ObjectType } from '@nestjs/graphql';
import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Days } from '@common/enums';
import { ISchedule, IWeeklySchedule } from '@common/interfaces';
import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
import { User } from 'users/entities/user.entity';
export type WeeklyScheduleDocument = WeeklySchedule & Document;

@ObjectType()
@Schema()
@InputType('ScheduleInputType')
export class Schedule implements ISchedule {
  @Field(() => Days)
  @Prop(Days)
  day: Days;
  @Field(() => Number)
  @Prop({ min: 0, max: 24 })
  time_start: number;
  @Field(() => Number)
  @Prop({ min: 0, max: 24 })
  time_end: number;
}

@ObjectType()
@Schema()
export class WeeklySchedule implements IWeeklySchedule {
  @Field(() => ID)
  id: string;
  @Field(() => User, { description: 'Example field (placeholder)' })
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
  coach: string;
  @Field(() => [Schedule], { description: 'Example field (placeholder)' })
  @Prop({ childSchemas: [Schedule] })
  schedule: Schedule[];
}
export const WeeklyScheduleSchema = SchemaFactory.createForClass(
  WeeklySchedule,
);
export const ScheduleSchema = SchemaFactory.createForClass(Schedule);
