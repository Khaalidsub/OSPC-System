import { InputType, Field } from '@nestjs/graphql';
import { IDepartmentModeratorApplication } from '@common/interfaces';

@InputType()
export class CreateDepartmentModeratorApplication
  implements IDepartmentModeratorApplication {
  @Field(() => String, { description: 'Example field (placeholder)' })
  description: string;
  @Field(() => String, { description: 'Example field (placeholder)' })
  department: string;
  @Field(() => [String], { description: 'Example field (placeholder)' })
  resumeLinks: string[];
  @Field(() => String, {
    description: 'Example field (placeholder)',
  })
  user: string;
}
