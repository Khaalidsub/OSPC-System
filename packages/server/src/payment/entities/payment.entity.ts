import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Payment {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
