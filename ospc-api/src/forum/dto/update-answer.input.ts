import { InputType, PartialType } from '@nestjs/graphql';
import { Answer } from '../entities/answer.entity';

@InputType()
export class UpdateAnswerInput extends PartialType(Answer, InputType) {
  id: string;
}
