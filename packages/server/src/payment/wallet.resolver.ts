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
import { CurrentUser, GqlAuthGuard } from 'auth/guards/graph-auth.guard';
import { User } from 'users/entities/user.entity';
import { TransactionHistory } from './entities/transaction-history';
import { UserWallet, UserWalletDocument } from './entities/user-wallet.entity';
import { TopUp } from './entities/payment.entity';
import { Logger, UseGuards } from '@nestjs/common';
import { LessonDocument } from 'coach/entities/lesson.entity';
import { OnEvent } from '@nestjs/event-emitter';

@Resolver(() => UserWallet)
export class UserWalletResolver {
  private readonly logger = new Logger(UserWalletResolver.name);
  constructor(private readonly userWalletService: UserWalletService) {}

  @Mutation(() => UserWallet)
  createUserWallet(
    @Args('createUserWalletInput') createUserWalletInput: CreateUserWalletInput,
  ) {
    return this.userWalletService.create(createUserWalletInput);
  }

  @Query(() => [UserWallet], { name: 'wallets' })
  findAllWallets() {
    return this.userWalletService.findAll();
  }

  @Query(() => UserWallet, { name: 'wallet' })
  findOneWallet(@Args('id', { type: () => String }) id: string) {
    return this.userWalletService.findOne(id);
  }
  @Query(() => UserWallet, { name: 'myWallet', nullable: true })
  @UseGuards(GqlAuthGuard)
  findUserWallet(@CurrentUser() user: User) {
    return this.userWalletService.findOneByQuery({ user: user.id });
  }

  @Mutation(() => UserWallet)
  updateUserWallet(
    @CurrentUser() user: User,
    @Args('updateUserWalletInput') updateUserWalletInput: UpdateUserWalletInput,
  ) {
    return this.userWalletService.update(user.id, updateUserWalletInput);
  }

  @OnEvent('transaction.created')
  async onTransactionCreated(payload: { topup: TopUp; user: string }) {
    try {
      this.logger.log(`Wallet of user ${payload.user} is being top upped...`)

      let wallet = await this.userWalletService.findOneByQuery({
        user: payload.user,
      });
      if (wallet) {
        await this.userWalletService.update(wallet.id, {
          balance: wallet.balance + payload.topup,
        });
      } else {
        await this.userWalletService.create({
          user: payload.user,
          balance: payload.topup,
        });
      }
    } catch (error) {
      this.logger.error(error.message)
    }
  }

  @OnEvent('lesson.paid')
  async onLessonPaid(payload: { lesson: LessonDocument; amount: number }) {
    try {
      let wallet = await this.userWalletService.findOneByQuery({
        user: payload.lesson.coach,
      });
      if (wallet) {
        await this.userWalletService.update(wallet.id, {
          balance: wallet.balance + payload.amount,
        });
      } else {
        await this.userWalletService.create({
          user: payload.lesson.coach,
          balance: payload.amount,
        });
      }
    } catch (error) {
      this.logger.error(error.message)

      throw new Error(error.message);
    }
  }

  @Mutation(() => TransactionHistory)
  topUpUser(@CurrentUser() user: User, @Args('token') token: string) {}

  @ResolveField()
  async user(@Parent() userWallet: UserWalletDocument) {
    const wallet = await userWallet.populate('user').execPopulate();
    return wallet.user;
  }
}
