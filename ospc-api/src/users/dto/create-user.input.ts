import { InputType, Field } from '@nestjs/graphql';
import { IUser, Status } from '../types';

@InputType()
export class CreateUserInput implements IUser {
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
  @Field(() => Status, {
    defaultValue: Status.inactive,
    nullable: true,
    description: 'Example field (placeholder)',
  })
  coachingStatus: Status;
}
