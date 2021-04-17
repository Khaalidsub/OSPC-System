import { Field, InputType, OmitType, PartialType } from '@nestjs/graphql';
import { IsNumber, IsPhoneNumber } from 'class-validator';
import { User } from 'users/entities/user.entity';

@InputType()
export class UpdateUserInput extends PartialType(
  OmitType(User, [ 'id', 'phoneNumber'] as const, InputType),
) {
  // @IsPhoneNumber()
  @IsNumber()
  @Field()
  phoneNumber?:number;
}
