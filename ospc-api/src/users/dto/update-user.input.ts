import { CreateUserInput } from './create-user.input';
import { InputType, Field, PartialType, ID } from '@nestjs/graphql';
import { Role, Status } from '../types';

@InputType()
export class UpdateUserInput extends PartialType(CreateUserInput) {
  @Field(() => ID)
  id: string;
  @Field(() => Status, { description: 'Example field (placeholder)' })
  coachingStatus?: Status;
  @Field(() => Status, { description: 'Example field (placeholder)' })
  accountStatus: Status;
  @Field(() => Status, { description: 'Example field (placeholder)' })
  role: Role;
}
