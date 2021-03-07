import { InputType, OmitType, PartialType } from '@nestjs/graphql';
import { Answer } from 'forum/entities/answer.entity';
@InputType()
export class UpdateAnswerInput extends OmitType(Answer, ['user'], InputType) {}
