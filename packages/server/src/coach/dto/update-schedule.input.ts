import { InputType, PartialType, Field, ID, OmitType } from '@nestjs/graphql';
import { WeeklySchedule } from '../entities/schedule.entity';

@InputType()
export class UpdateWeeklySchedule extends PartialType(
  OmitType(WeeklySchedule, ['coach', 'id'], InputType),
) {}
