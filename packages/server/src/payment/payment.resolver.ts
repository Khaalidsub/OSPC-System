import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { Payment, TopUp } from './entities/payment.entity';
import { CurrentUser, GqlAuthGuard } from 'auth/guards/graph-auth.guard';
import { User } from 'users/entities/user.entity';
import {
  TransactionHistory,
  TransactionHistoryDocument,
} from './entities/transaction-history';
import { Stripe } from 'stripe';
import { Inject, Logger, UseGuards } from '@nestjs/common';
import {
  CreateTransactionInput,
  TransactionType,
} from './dto/create-transaction.input';
import { TransactionService } from './transaction.service';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { LessonDocument } from 'coach/entities/lesson.entity';
@Resolver(() => TransactionHistory)
export class TransactionHistoryResolver {
  private readonly logger = new Logger(TransactionHistoryResolver.name);
  constructor(
    @Inject('Stripe')
    private readonly stripeClient: Stripe,
    private eventEmitter: EventEmitter2,
    private readonly transactionHistoryService: TransactionService,
  ) {}

  @Mutation(() => TransactionHistory)
  @UseGuards(GqlAuthGuard)
  async createPayment(
    @CurrentUser() user: User,
    @Args('topup', { type: () => TopUp }) topup: TopUp,
    @Args('createTransactionHistoryInput')
    createTransactionHistory: CreateTransactionInput,
  ) {
    try {
      const transaction = await this.transactionHistoryService.create({
        ...createTransactionHistory,
        user: user.id,
        transactionType: TransactionType.topup,
      } as any);
      this.logger.log(`transaction with the id of ${transaction.id} has been created`)

      this.eventEmitter.emit('transaction.created', { topup, user: user.id });
      return transaction;
    } catch (error) {
      this.logger.error(error.message)

      throw new Error(error.message);
    }
  }

  @Mutation(() => String)
  async createPaymentIntent(
    @Args('topup', { type: () => TopUp }) topup: TopUp,
  ) {
    try {
      const client_secret = await this.stripeClient.paymentIntents.create({
        amount: topup.valueOf() * 100,
        currency: 'myr',
      });
      return client_secret.client_secret;
    } catch (error) {
      this.logger.error(error.message)

      throw new Error(error.message);
    }
  }

  @Query(() => [TransactionHistory], { name: 'transactions', nullable: true })
  @UseGuards(GqlAuthGuard)
  findAllTransactions(
    @Args('type', { type: () => TransactionType })
    transactionType: TransactionType,
    @CurrentUser() user: User,
  ) {
    return this.transactionHistoryService.findByQuery({
      user: user.id,
      transactionType,
    });
  }

  @ResolveField()
  async user(@Parent() transactionHistory: TransactionHistoryDocument) {
    const transaction = await transactionHistory
      .populate('user')
      .execPopulate();
    return transaction.user;
  }

  @OnEvent('lesson.paid')
  async onLessonBooked(payload: { lesson: LessonDocument; amount: number }) {
    try {
      this.logger.log(`Transaction of lesson: ${payload.lesson.id} is being created....`)
      await this.transactionHistoryService.create({
        amount: payload.amount,
        currency: 'ST',
        user: payload.lesson.student,
        transactionType: TransactionType.booking,
      } as any);
      await this.transactionHistoryService.create({
        amount: payload.amount,
        currency: 'ST',
        user: payload.lesson.coach,
        transactionType: TransactionType.booking,
      } as any);
    } catch (error) {
      this.logger.error(error.message)


      throw new Error(error.message);
    }
  }
}
