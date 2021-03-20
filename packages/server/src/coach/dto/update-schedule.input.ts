import { InputType, PartialType, Field, ID } from '@nestjs/graphql';
import { WeeklySchedule } from '../entities/schedule.entity';

@InputType()
export class UpdateWeeklySchedule extends PartialType(
  WeeklySchedule,
  InputType,
) {}
