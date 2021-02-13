import { InputType, PartialType } from '@nestjs/graphql';

import { IQuestion } from '../types/question.type';

@InputType()
export class UpdateQuestionInput extends PartialType(IQuestion, InputType) {}
