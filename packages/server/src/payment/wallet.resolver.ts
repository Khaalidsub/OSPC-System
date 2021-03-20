import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { UserWalletService } from './wallet.service';
import { CreateUserWalletInput } from './dto/create-user-wallet.input';
import { UpdateUserWalletInput } from './dto/update-user-wallet.input';
import { CurrentUser } from 'auth/guards/graph-auth.guard';
import { User } from 'users/entities/user.entity';
import { TransactionHistory } from './entities/transaction-history';
import { UserWallet } from './entities/user-wallet.entity';
import { UsersService } from 'users/users.service';

@Resolver(() => UserWallet)
export class UserWalletResolver {
  constructor(
    private readonly usersService: UsersService,
    private readonly UserWalletService: UserWalletService,
  ) {}

  @Mutation(() => UserWallet)
  createUserWallet(
    @Args('createUserWalletInput') createUserWalletInput: CreateUserWalletInput,
  ) {
    return this.UserWalletService.create(createUserWalletInput);
  }

  @Query(() => [UserWallet], { name: 'wallets' })
  findAllWallets() {
    return this.UserWalletService.findAll();
  }

  @Query(() => UserWallet, { name: 'wallet' })
  findOneWallet(@Args('id', { type: () => String }) id: string) {
    return this.UserWalletService.findOne(id);
  }

  @Query(() => [TransactionHistory], { name: 'transactions' })
  findAllTransactions() {
    return this.UserWalletService.findAll();
  }

  @Query(() => UserWallet, { name: 'transaction' })
  findOneTransaction(@Args('id', { type: () => String }) id: string) {
    return this.UserWalletService.findOne(id);
  }

  @Mutation(() => UserWallet)
  updateUserWallet(
    @CurrentUser() user: User,
    @Args('updateUserWalletInput') updateUserWalletInput: UpdateUserWalletInput,
  ) {
    return this.UserWalletService.update(user.id, updateUserWalletInput);
  }

  @Mutation(() => TransactionHistory)
  topUpUser(@CurrentUser() user: User, @Args('token') token: string) {}

  @ResolveField()
  user(@Parent() userWallet: UserWallet) {
    return this.usersService.findById(userWallet.user);
  }
}
