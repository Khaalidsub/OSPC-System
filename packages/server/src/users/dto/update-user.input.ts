import { InputType, OmitType, PartialType } from '@nestjs/graphql';
import { User } from 'users/entities/user.entity';

@InputType()
export class UpdateUserInput extends PartialType(
  OmitType(User, ['email', 'id'] as const, InputType),
) {}
