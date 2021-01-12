import { InputType, Field } from '@nestjs/graphql';
import { User } from '../../users/entities/user.entity';

@InputType()
export class CreateDepartmentInput {
  @Field(() => String, { description: 'Example field (placeholder)' })
  departmentName: string;
  // @Field(() => String, { description: 'Example field (placeholder)' })
  // departmentModerator: string;
}
