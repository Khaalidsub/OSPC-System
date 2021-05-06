import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateMessageInput } from './dto/create-message.input';
import { UpdateMessageInput } from './dto/update-message.input';
import { Message, MessageDocument } from './entities/message.entity';

@Injectable()
export class MessagesService {
  constructor(
    @InjectModel(Message.name) private MessageModel: Model<MessageDocument>,
  ) {}
  create(createMessageInput: CreateMessageInput) {
    return new this.MessageModel(createMessageInput).save();
  }

  findAll() {
    return this.MessageModel.find({});
  }

  findOne(id: string) {
    return this.MessageModel.findOne({ id: id });
  }
  findByQuery(query){
    return this.MessageModel.find(query);
  }
  findById(id: string) {
    return this.MessageModel.findById(id);
  }

  update(id: string, updateMessageInput: UpdateMessageInput) {
    return this.MessageModel.findByIdAndUpdate(id, updateMessageInput, {
      new: true,
    }).exec();
  }

  remove(id: string) {
    return this.MessageModel.findByIdAndDelete(id).exec();
  }
}
