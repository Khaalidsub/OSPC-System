import { InputType, PartialType } from '@nestjs/graphql';
import { IAnswer } from '../types/answer.types';
@InputType()
export class UpdateAnswerInput extends PartialType(IAnswer, InputType) {}
