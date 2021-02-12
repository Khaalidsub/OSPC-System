import { InputType, PartialType, Field, ID } from '@nestjs/graphql';
import { WeeklySchedule } from '../entities/schedule.entity';
import { CreateWeeklyScheduleInput } from './create-schedule.input';

@InputType()
export class UpdateWeeklySchedule extends PartialType(
  WeeklySchedule,
  InputType,
) {
  @Field(() => ID)
  id: string;
}
