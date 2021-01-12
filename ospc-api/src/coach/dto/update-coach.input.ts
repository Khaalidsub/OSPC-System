import { CreateCoachInput } from './create-coach.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateCoachInput extends PartialType(CreateCoachInput) {
  @Field(() => String)
  id: string;
}
