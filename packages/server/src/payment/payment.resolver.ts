import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { PaymentService } from './payment.service';
import { Payment } from './entities/payment.entity';
import { CreatePaymentInput } from './dto/create-payment.input';
import { UpdatePaymentInput } from './dto/update-payment.input';
import { CurrentUser } from 'auth/guards/graph-auth.guard';
import { User } from 'users/entities/user.entity';
import { TransactionHistory } from './entities/transaction-history';
import { UserWallet } from './entities/user-wallet.entity';

@Resolver(() => Payment)
export class PaymentResolver {
  constructor(private readonly paymentService: PaymentService) {}

  @Mutation(() => Payment)
  createPayment(
    @Args('createPaymentInput') createPaymentInput: CreatePaymentInput,
  ) {
    return this.paymentService.create(createPaymentInput);
  }

  @Query(() => [UserWallet], { name: 'wallets' })
  findAllWallets() {
    return this.paymentService.findAll();
  }

  @Query(() => UserWallet, { name: 'wallet' })
  findOneWallet(@Args('id', { type: () => String }) id: string) {
    return this.paymentService.findOne(id);
  }

  @Query(() => [TransactionHistory], { name: 'transactions' })
  findAllTransactions() {
    return this.paymentService.findAll();
  }

  @Query(() => UserWallet, { name: 'transaction' })
  findOneTransaction(@Args('id', { type: () => String }) id: string) {
    return this.paymentService.findOne(id);
  }

  @Mutation(() => UserWallet)
  updateUserWallet(
    @CurrentUser() user: User,
    @Args('updatePaymentInput') updatePaymentInput: UpdatePaymentInput,
  ) {
    return this.paymentService.update(user.id, updatePaymentInput);
  }

  @Mutation(() => Payment)
  removePayment(@Args('id', { type: () => String }) id: string) {
    return this.paymentService.remove(id);
  }

  @Mutation(() => TransactionHistory)
  topUpUser(@CurrentUser() user: User, @Args('token') token: string) {}
}
