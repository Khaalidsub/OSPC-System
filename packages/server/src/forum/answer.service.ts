import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateAnswerInput } from './dto/create-answer.input';
import { Answer, AnswerDocument } from './entities/answer.entity';
import * as mongoose from 'mongoose';
@Injectable()
export class AnswerService {
  constructor(
    @InjectModel(Answer.name) private answerModel: Model<AnswerDocument>,
  ) {}
  create(createAnswerInput: CreateAnswerInput) {
    return new this.answerModel(createAnswerInput).save();
  }

  findAll() {
    return this.answerModel.find({}).exec();
  }

  findOne(query) {
    return this.answerModel.find(query).exec();
  }
  findByQuery(query) {
    return this.answerModel.find(query).exec();
  }
  findById(id: string) {
    return this.answerModel.findById(id).exec();
  }

  update(id: string, updateAnswerInput: any) {
    return this.answerModel
      .findByIdAndUpdate(id, updateAnswerInput, {
        new: true,
        omitUndefined: true,
      })
      .exec();
  }
  countAnswers(question: string): Promise<{ answers: number }[]> {
    return this.answerModel
      .aggregate([
        {
          $match: {
            question: mongoose.Types.ObjectId(question),
          },
        },
        {
          $lookup: {
            from: 'questions',
            localField: 'question',
            foreignField: '_id',
            as: 'question',
          },
        },
        {
          $unwind: {
            path: '$question',
          },
        },
        {
          $count: 'answers',
        },
      ])
      .exec();
  }

  remove(id: string) {
    return this.answerModel.findByIdAndRemove(id).exec();
  }
}
