import { InputType, PartialType } from '@nestjs/graphql';
import { UserWallet } from '../entities/user-wallet.entity';
@InputType()
export class UpdateUserWalletInput extends PartialType(UserWallet, InputType) {}
