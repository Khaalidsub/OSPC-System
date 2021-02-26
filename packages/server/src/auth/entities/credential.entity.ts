import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { ICredential } from '../types';
@ObjectType({ implements: ICredential })
@InputType()
export class Credential implements ICredential {
  @Field(() => String, { description: 'Example field (placeholder)' })
  password: string;
  @Field(() => String, { description: 'Example field (placeholder)' })
  email: string;
}
