import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class Subject {
  @Field(() => ID, { description: 'Example field (placeholder)' })
  id: string;
  @Field(() => String, { description: 'Example field (placeholder)' })
  subjectName: string;
  @Field(() => String, { description: 'Example field (placeholder)' })
  description: string;
}
