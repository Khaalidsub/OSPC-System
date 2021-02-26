import { InputType, Field, Int, PartialType, ID } from '@nestjs/graphql';
import { CreateSubjecSpecialization } from './create-coach.input';

@InputType()
export class UpdateSubjectSpecialization extends PartialType(
  CreateSubjecSpecialization,
) {
  @Field(() => ID)
  id: string;
}
