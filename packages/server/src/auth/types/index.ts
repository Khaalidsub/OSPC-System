import { Field, InterfaceType, ObjectType } from '@nestjs/graphql';
import { User } from 'users/entities/user.entity';

@InterfaceType()
export abstract class ICredential {
  @Field(() => String)
  email: string;
  @Field(() => String)
  password: string;
}

@ObjectType()
export class AuthResult {
  @Field(() => String)
  token: string;
  @Field(() => User)
  user: User;
}
