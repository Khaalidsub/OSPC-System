import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateSubjectInput {
  @Field(() => String, { description: 'Example field (placeholder)' })
  name: string;
  @Field(() => String, { description: 'Example field (placeholder)' })
  description: string;
  @Field(() => String, { description: 'Example field (placeholder)' })
  department: string;
  @Field()
  image: string;
}
