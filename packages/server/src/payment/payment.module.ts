import { Module } from '@nestjs/common';

import { TransactionHistoryResolver } from './payment.resolver';
import { UserWallet, UserWalletSchema } from './entities/user-wallet.entity';
import { MongooseModule } from '@nestjs/mongoose';
import {
  TransactionHistory,
  TransactionHistorySchema,
} from './entities/transaction-history';
import { UserWalletResolver } from './wallet.resolver';
import { TransactionService } from './transaction.service';
import { UserWalletService } from './wallet.service';
import { UsersModule } from 'users/users.module';
import Stripe from 'stripe'

const stripe = new Stripe('sk_test_51HvvGmKkLdH6RPnGnZt9JrklqgmbI1EtzqBUTlG0yQz6h7A7jvXThLuLt8q76LEDVGuJhwb4asl7r78y0axn6sMq00hvXoiCDu',{apiVersion:'2020-08-27'})
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: UserWallet.name, schema: UserWalletSchema },
      { name: TransactionHistory.name, schema: TransactionHistorySchema },
    ]),
    UsersModule,
  ],
  providers: [
    TransactionHistoryResolver,
    UserWalletResolver,
    TransactionService,
    UserWalletService,

    {
    provide:'Stripe',
    useValue:stripe
    }
  ],
  exports:[
    UserWalletService,
    TransactionService,
  ]
})
export class PaymentModule {}
