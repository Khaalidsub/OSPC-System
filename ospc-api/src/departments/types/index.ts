import { Field, InterfaceType } from '@nestjs/graphql';
import { User } from '../../users/entities/user.entity';
import { IUser } from '../../users/types';

@InterfaceType()
export abstract class IDepartment {
  @Field(() => String)
  departmentName: string;
  @Field(() => String)
  departmentDescription: string;
  @Field(() => User, {
    description: 'Example field (placeholder)',
    nullable: true,
  })
  departmentModerator?: IUser;
}
