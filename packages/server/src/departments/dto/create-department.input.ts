import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateDepartmentInput {
  @Field(() => String, { description: 'Example field (placeholder)' })
  name: string;
  @Field(() => String, { description: 'Example field (placeholder)' })
  description: string;
  @Field(() => String, {
    description: 'Example field (placeholder)',
  })
  moderator: string;

  @Field(() => String, { description: ''})
  image: string;
}
