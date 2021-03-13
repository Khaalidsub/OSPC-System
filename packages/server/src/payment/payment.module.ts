import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentResolver } from './payment.resolver';
import { UserWallet, UserWalletSchema } from './entities/user-wallet.entity';
import { MongooseModule } from '@nestjs/mongoose';
import {
  TransactionHistory,
  TransactionHistorySchema,
} from './entities/transaction-history';
import { UserWalletResolver } from './wallet.resolver';
import { TransactionService } from './transaction.service';
import { UserWalletService } from './wallet.service';
import { TransactionHistoryResolver } from './transaction.resolver';
import { UsersModule } from 'users/users.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: UserWallet.name, schema: UserWalletSchema },
      { name: TransactionHistory.name, schema: TransactionHistorySchema },
    ]),
    UsersModule,
  ],
  providers: [
    PaymentResolver,
    TransactionHistoryResolver,
    UserWalletResolver,
    TransactionService,
    UserWalletService,
    PaymentService,
  ],
})
export class PaymentModule {}
