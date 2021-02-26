import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
import { User } from '../../users/schemas/user.schema';

import { Days, ISchedule, IWeeklySchedule } from '../types';

export type WeeklyScheduleDocument = WeeklySchedule & Document;
export class Schedule implements ISchedule {
  @Prop(Days)
  day: Days;
  @Prop({ min: 0, max: 24 })
  time_start: number;
  @Prop({ min: 0, max: 24 })
  time_end: number;
}

@Schema()
export class WeeklySchedule implements IWeeklySchedule {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
  coach: User;
  @Prop(raw([Schedule]))
  schedule: Schedule[];
}

export const WeeklyScheduleSchema = SchemaFactory.createForClass(
  WeeklySchedule,
);
