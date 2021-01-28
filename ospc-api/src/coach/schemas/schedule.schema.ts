import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
import { User } from 'src/users/schemas/user.schema';

import { Days, ISchedule, IWeeklySchedule } from '../types';

export type WeeklyScheduleDocument = WeeklySchedule & Document;
@Schema()
export class Schedule implements ISchedule {
  @Prop(Days)
  day: Days;
  @Prop()
  time_start: number;
  @Prop()
  time_end: number;
}

@Schema()
export class WeeklySchedule implements IWeeklySchedule {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
  coach: User;
  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: Schedule.name }],
  })
  schedule: Schedule[];
}

export const WeeklyScheduleSchema = SchemaFactory.createForClass(
  WeeklySchedule,
);
