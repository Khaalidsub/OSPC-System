import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTransactionInput } from './dto/create-transaction.input';
import {
  TransactionHistory,
  TransactionHistoryDocument,
} from './entities/transaction-history';

@Injectable()
export class TransactionService {
  constructor(
    @InjectModel(TransactionHistory.name)
    private readonly transactionModel: Model<TransactionHistoryDocument>,
  ) {}
  create(createTransactionInput: CreateTransactionInput) {
    return this.transactionModel.create(createTransactionInput);
  }

  findAll() {
    return this.transactionModel.find({});
  }

  findOne(id: string) {
    return this.transactionModel.findOne({ id });
  }

  remove(id: string) {
    return this.transactionModel.findByIdAndDelete(id);
  }
}
