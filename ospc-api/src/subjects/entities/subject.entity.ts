import { ObjectType, Field, ID } from '@nestjs/graphql';
import { ISubject } from '../types';

@ObjectType()
export class Subject implements ISubject {
  @Field(() => ID, { description: 'Example field (placeholder)' })
  id: string;
  @Field(() => String, { description: 'Example field (placeholder)' })
  subjectName: string;
  @Field(() => String, { description: 'Example field (placeholder)' })
  description: string;
}
