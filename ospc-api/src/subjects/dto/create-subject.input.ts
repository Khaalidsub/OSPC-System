import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateSubjectInput {
  @Field(() => String, { description: 'Example field (placeholder)' })
  subjectName: string;
  @Field(() => String, { description: 'Example field (placeholder)' })
  description: string;
}
