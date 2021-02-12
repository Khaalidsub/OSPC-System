import { InputType, PartialType } from '@nestjs/graphql';
import { Question } from '../entities/forum.entity';

@InputType()
export class UpdateQuestionInput extends PartialType(Question, InputType) {}
