import { Field, InterfaceType } from '@nestjs/graphql';

@InterfaceType()
export abstract class ICredential {
  @Field(() => String)
  email: string;
  @Field(() => String)
  password: string;
}
