import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateQuestionInput } from './dto/create-forum.input';
import { UpdateQuestionInput } from './dto/update-forum.input';
import { Question, QuestionDocument } from './schemas/question.schema';

@Injectable()
export class QuestionService {
  constructor(
    @InjectModel(Question.name) private questionModel: Model<QuestionDocument>,
  ) {}
  create(createQuestionInput: CreateQuestionInput) {
    return new this.questionModel(createQuestionInput).save();
  }

  findAll() {
    return this.questionModel.find({}).exec();
  }

  findOne(query) {
    return this.questionModel.find(query).exec();
  }

  update(id: string, updateQuestionInput: any) {
    return this.questionModel
      .findByIdAndUpdate(id, updateQuestionInput, {
        new: true,
        omitUndefined: true,
      })
      .exec();
  }

  remove(id: string) {
    this.questionModel.findByIdAndUpdate(id, {});
    return this.questionModel.findByIdAndRemove(id).exec();
  }
}
