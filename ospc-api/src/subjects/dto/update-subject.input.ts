import { InputType, PartialType, ID } from '@nestjs/graphql';
import { Subject } from '../entities/subject.entity';

@InputType()
export class UpdateSubjectInput extends PartialType(Subject, InputType) {}
