import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { TransactionService } from './transaction.service';
import { CreateTransactionInput } from './dto/create-transaction.input';
import { TransactionHistory } from './entities/transaction-history';
import { UserWallet } from './entities/user-wallet.entity';
import { UsersService } from 'users/users.service';

@Resolver(() => TransactionHistory)
export class TransactionHistoryResolver {
  constructor(
    private readonly usersService: UsersService,
    private readonly transactionHistoryService: TransactionService,
  ) {}

  @Mutation(() => TransactionHistory)
  createTransactionHistory(
    @Args('createTransactionHistoryInput')
    createTransactionHistoryInput: CreateTransactionInput,
  ) {
    return this.transactionHistoryService.create(createTransactionHistoryInput);
  }

  // @Query(() => [TransactionHistory], { name: 'transactions' })
  findAllTransactions() {
    return this.transactionHistoryService.findAll();
  }

  @Query(() => UserWallet, { name: 'transaction' })
  findOneTransaction(@Args('id', { type: () => String }) id: string) {
    return this.transactionHistoryService.findOne(id);
  }

  @Mutation(() => TransactionHistory)
  removeTransactionHistory(@Args('id', { type: () => String }) id: string) {
    return this.transactionHistoryService.remove(id);
  }
  @ResolveField()
  user(@Parent() userWallet: UserWallet) {
    return this.usersService.findById(userWallet.user);
  }
}
