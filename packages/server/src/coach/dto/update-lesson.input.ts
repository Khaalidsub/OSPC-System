import { InputType, PartialType, Field, ID } from '@nestjs/graphql';
import { CreateLessonInput } from './create-lesson.input';

@InputType()
export class UpdateLessonInput extends PartialType(CreateLessonInput) {
  @Field(() => ID)
  id: string;
}
