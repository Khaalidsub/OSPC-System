import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';

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
    return this.userModel.findByIdAndUpdate(id, data).exec();
  }

  remove(id: string) {
    return this.userModel.findByIdAndDelete(id).exec();
  }
}
