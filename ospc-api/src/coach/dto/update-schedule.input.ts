import { InputType, PartialType, Field, ID } from '@nestjs/graphql';
import { CreateWeeklyScheduleInput } from './create-schedule.input';

@InputType()
export class UpdateWeeklySchedule extends PartialType(
  CreateWeeklyScheduleInput,
) {
  @Field(() => ID)
  id: string;
}
