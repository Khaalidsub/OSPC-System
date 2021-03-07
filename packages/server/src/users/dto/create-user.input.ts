import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateUserInput {
  @Field(() => String, { description: 'Example field (placeholder)' })
  name: string;
  @Field(() => String, { description: 'Example field (placeholder)' })
  university: string;
  @Field(() => String, { description: 'Example field (placeholder)' })
  password?: string;
  @Field(() => String, { description: 'Example field (placeholder)' })
  email: string;
  @Field(() => String, { description: 'Example field (placeholder)' })
  phoneNumber: string;
  @Field(() => String, { description: 'Example field (placeholder)' })
  universityId: string;
}
