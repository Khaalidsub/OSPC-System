import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  create(user: User) {
    const createdUser = new this.userModel(user);
    return createdUser.save();
  }

  findAll() {
    return this.userModel.find().exec();
  }

  findOne(query) {
    return this.userModel.findOne(query).exec();
  }

  findById(id: string) {
    return this.userModel.findById(id).exec();
  }

  update(id: string, data: any) {
    return this.userModel.findByIdAndUpdate(id, data, { new: true }).exec();
  }

  remove(id: string) {
    return this.userModel.findByIdAndDelete(id).exec();
  }
  findByIds(users: string[]) {
    return this.userModel.find({
      _id: {
        $in: users,
      },
    });
  }
}
