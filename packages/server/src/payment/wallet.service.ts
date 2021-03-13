import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserWalletInput } from './dto/create-user-wallet.input';
import { UpdateUserWalletInput } from './dto/update-user-wallet.input';
import { UserWallet, UserWalletDocument } from './entities/user-wallet.entity';

@Injectable()
export class UserWalletService {
  constructor(
    @InjectModel(UserWallet.name)
    private readonly userWalletModel: Model<UserWalletDocument>,
  ) {}
  create(createUserWalletInput: CreateUserWalletInput) {
    return new this.userWalletModel(createUserWalletInput).save();
  }

  findAll() {
    return this.userWalletModel.find({});
  }

  findOne(id: string) {
    return this.userWalletModel.findById(id);
  }

  update(id: string, updateUserWalletInput: UpdateUserWalletInput) {
    return this.userWalletModel.findByIdAndUpdate(id, updateUserWalletInput, {
      new: true,
    });
  }
}
