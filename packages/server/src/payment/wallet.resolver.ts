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
import { UsersService } from 'users/users.service';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { TopUp } from './entities/payment.entity';
import { UseGuards } from '@nestjs/common';

@Resolver(() => UserWallet)
export class UserWalletResolver {
  constructor(
    private readonly usersService: UsersService,
    private readonly userWalletService: UserWalletService,
    private eventEmitter: EventEmitter2,
  ) {}

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
  @Query(() => UserWallet, { name: 'myWallet',nullable: true})
  @UseGuards(GqlAuthGuard)
  findUserWallet(
    @CurrentUser() user: User) {
    return this.userWalletService.findOneByQuery({user: user.id});
  }


  // @Query(() => [TransactionHistory], { name: 'transactions' })
  // findAllTransactions() {
  //   return this.userWalletService.findAll();
  // }

 

  @Mutation(() => UserWallet)
  updateUserWallet(
    @CurrentUser() user: User,
    @Args('updateUserWalletInput') updateUserWalletInput: UpdateUserWalletInput,
  ) {
    return this.userWalletService.update(user.id, updateUserWalletInput);
  }

  @OnEvent('transaction.created')
  async onTransactionCreated(payload:{topup:TopUp, user:string}){
   try {
     console.log('hello');
     
      let wallet = await this.userWalletService.findOneByQuery({user:payload.user})
      if (wallet) {
       await this.userWalletService.update(wallet.id,{balance: wallet.balance + payload.topup})
      }else{
        await this.userWalletService.create({user:payload.user, balance: payload.topup})
      }
    } catch (error) {
      console.log(error);
  
    }
  }

  @Mutation(() => TransactionHistory)
  topUpUser(@CurrentUser() user: User, @Args('token') token: string) {}

  @ResolveField()
  async user(@Parent() userWallet: UserWalletDocument) {
    const wallet = await userWallet.populate('user').execPopulate()
    return wallet.user
  }
}
