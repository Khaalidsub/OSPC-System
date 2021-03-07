import { InputType, OmitType, PartialType } from '@nestjs/graphql';
import { Question } from 'forum/entities/forum.entity';

@InputType()
export class UpdateQuestionInput extends OmitType(
  Question,
  ['user', 'subject'],
  InputType,
) {}
