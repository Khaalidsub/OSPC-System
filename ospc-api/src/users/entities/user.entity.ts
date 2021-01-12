import { ObjectType, Field, Int, ID, InputType } from '@nestjs/graphql';
import { IUser, Role, Status } from '../types';

@ObjectType()
@InputType('userType')
export class User implements IUser {
  @Field(() => ID, { description: 'Example field (placeholder)' })
  id: string;
  @Field(() => String, { description: 'Example field (placeholder)' })
  name: string;
  @Field(() => String, { description: 'Example field (placeholder)' })
  password?: string;
  @Field(() => String, { description: 'Example field (placeholder)' })
  email: string;
  @Field(() => String, { description: 'Example field (placeholder)' })
  phoneNumber: string;
  @Field(() => String, { description: 'Example field (placeholder)' })
  universityId: string;
  @Field(() => Role, { description: 'Example field (placeholder)' })
  role: Role;
  @Field(() => Status, { description: 'Example field (placeholder)' })
  accountStatus: Status;
  @Field(() => Status, {
    name: 'CoachingStatus',
    defaultValue: Status.inactive,
    nullable: true,
    description: 'Example field (placeholder)',
  })
  coachingStatus: Status;
}
