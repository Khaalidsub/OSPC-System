import { InputType, OmitType, PartialType } from '@nestjs/graphql';
import { Answer } from 'forum/entities/answer.entity';
@InputType()
export class UpdateAnswerInput extends PartialType(
  OmitType(Answer, ['user'], InputType),
) {}
