import { ObjectType, Field, InputType } from '@nestjs/graphql';
import { ICredential } from '../types';

@InputType()
export class Credential implements ICredential {
  @Field(() => String, { description: 'Example field (placeholder)' })
  password: string;
  @Field(() => String, { description: 'Example field (placeholder)' })
  email: string;
}
