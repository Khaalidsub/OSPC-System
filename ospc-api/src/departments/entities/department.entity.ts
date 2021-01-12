import { ObjectType, Field } from '@nestjs/graphql';
import { User } from '../../users/entities/user.entity';

@ObjectType()
export class Department {
  @Field(() => String, { description: 'Example field (placeholder)' })
  id: String;
  @Field(() => String, { description: 'Example field (placeholder)' })
  departmentName: String;
  @Field(() => User, {
    description: 'Example field (placeholder)',
    nullable: true,
  })
  departmentModerator: User;
}
