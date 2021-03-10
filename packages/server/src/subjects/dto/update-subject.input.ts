import { InputType, PartialType, ID, OmitType } from '@nestjs/graphql';
import { Subject } from '../entities/subject.entity';

@InputType()
export class UpdateSubjectInput extends PartialType(
  OmitType(Subject, ['department'] as const, InputType),
) {}
