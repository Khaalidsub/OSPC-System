import { Resolver, Query, Mutation, Args, ResolveField, Parent } from '@nestjs/graphql';
import { PaymentService } from './payment.service';
import { Payment, TopUp } from './entities/payment.entity';
import { CreatePaymentInput } from './dto/create-payment.input';
import { UpdatePaymentInput } from './dto/update-payment.input';
import { CurrentUser, GqlAuthGuard } from 'auth/guards/graph-auth.guard';
import { User, UserDocument } from 'users/entities/user.entity';
import { TransactionHistory, TransactionHistoryDocument } from './entities/transaction-history';
import { UserWallet } from './entities/user-wallet.entity';

import {Stripe} from 'stripe'
import { Inject, UseGuards } from '@nestjs/common';
import { CreateTransactionInput, TransactionType } from './dto/create-transaction.input';
import { TransactionService } from './transaction.service';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { LessonDocument } from 'coach/entities/lesson.entity';
@Resolver(() => TransactionHistory)
export class PaymentResolver {
  constructor(private readonly paymentService: PaymentService,@Inject('Stripe')
   private readonly stripeClient: Stripe,
   private eventEmitter: EventEmitter2,
   private readonly transactionHistoryService: TransactionService) {}

  @Mutation(() => TransactionHistory)
  @UseGuards(GqlAuthGuard)
  async createPayment(
    @CurrentUser() user: User,
    @Args('topup', { type: () => TopUp }) topup: TopUp,
    @Args('createTransactionHistoryInput') createTransactionHistory: CreateTransactionInput,
  ) {
    try {
      const transaction = await  this.transactionHistoryService.create({...createTransactionHistory,user:user.id,transactionType:TransactionType.topup}as any);
      // emit transaction has been created
      this.eventEmitter.emit('transaction.created',{topup, user:user.id});
   return transaction
    } catch (error) {
      throw new Error(error.message)
    }
    
  }

  @Mutation(()=>String)
  async createPaymentIntent(@Args('topup', { type: () => TopUp }) topup: TopUp){
    try {
      
      const client_secret = await this.stripeClient.paymentIntents.create({
        amount:topup.valueOf()*100,
        currency:'myr',
        

      })
      return client_secret.client_secret
    } catch (error) {
      throw new Error(error.message)
    }
  }



  @Query(() => [TransactionHistory], { name: 'transactions',nullable:true })
  @UseGuards(GqlAuthGuard)
  findAllTransactions(@Args('type',{type: () => TransactionType}) transactionType: TransactionType,@CurrentUser() user: User) {
    return this.transactionHistoryService.findByQuery({user:user.id,transactionType});
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

  @ResolveField()
  async user(@Parent() transactionHistory:TransactionHistoryDocument){
    const transaction = await transactionHistory.populate('user').execPopulate()
    return transaction.user
  }

  @OnEvent('lesson.paid')
  async onLessonBooked(payload:{lesson:LessonDocument,amount:number})

  {
    try {
      await this.transactionHistoryService.create({amount:payload.amount,currency:'ST',user:payload.lesson.student,transactionType:TransactionType.booking}as any)
      await this.transactionHistoryService.create({amount:payload.amount,currency:'ST',user:payload.lesson.coach,transactionType:TransactionType.booking}as any)
    } catch (error) {
      console.log(error);
      
      throw new Error(error.message)
    }
  }
}
