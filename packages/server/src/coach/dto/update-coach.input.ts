import { InputType, Field, Int, PartialType, ID } from '@nestjs/graphql';
import { SubjectSpecialization } from '../entities/coach.entity';
@InputType()
export class UpdateSubjectSpecialization extends PartialType(
  SubjectSpecialization,
  InputType,
) {}
