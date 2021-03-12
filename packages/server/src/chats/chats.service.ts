import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateChatInput } from './dto/create-chat.input';
import { UpdateChatInput } from './dto/update-chat.input';
import { Chat, ChatDocument } from './entities/chat.entity';

@Injectable()
export class ChatsService {
  constructor(@InjectModel(Chat.name) private chatModel: Model<ChatDocument>) {}
  create(createChatInput: CreateChatInput) {
    return new this.chatModel(createChatInput).save();
  }

  findAll() {
    return this.chatModel.find({});
  }

  findOne(id: string) {
    return this.chatModel.findOne({ id: id });
  }
  findById(id: string) {
    return this.chatModel.findById(id);
  }

  update(id: string, updateChatInput: UpdateChatInput) {
    return this.chatModel
      .findByIdAndUpdate(id, updateChatInput, { new: true })
      .exec();
  }

  remove(id: string) {
    return this.chatModel.findByIdAndDelete(id).exec();
  }
}
