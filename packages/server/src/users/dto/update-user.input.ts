import { InputType, OmitType } from '@nestjs/graphql';
import { User } from 'users/entities/user.entity';

@InputType()
export class UpdateUserInput extends OmitType(
  User,
  ['email', 'id'] as const,
  InputType,
) {}
