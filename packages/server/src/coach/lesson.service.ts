import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateLessonInput } from './dto/create-lesson.input';
import { Lesson, LessonDocument } from './entities/lesson.entity';
import * as mongoose from 'mongoose';
@Injectable()
export class LessonsService {
  constructor(
    @InjectModel(Lesson.name)
    private lessonModel: Model<LessonDocument>,
  ) {}
  create(createSubjectInput: CreateLessonInput) {
    const newLesson = new this.lessonModel(createSubjectInput);

    return newLesson.save();
  }

  findAll() {
    return this.lessonModel.find().exec();
  }

  getBookedLessonsOfTheWeek(dateStart: number, dateEnd: number, coach: string) {
    return this.lessonModel.find({
      coach: coach,
      $and: [{ date: { $gte: dateStart } }, { date: { $lte: dateEnd } }],
    });
  }

  findOne(query) {
    return this.lessonModel.findOne(query).exec();
  }
  findByQuery(query) {
    return this.lessonModel.find(query).exec();
  }
  findStudentLessons(user: string, arg: { limit: number }) {
    return this.lessonModel
      .aggregate([
        {
          $match: {
            student: mongoose.Types.ObjectId(user),
          },
        },
      ])
      .sort({date:-1})
      .limit(arg.limit)    
      .exec();
  }
  findById(id: string) {
    return this.lessonModel.findById(id).exec();
  }

  update(id: string, data: any) {
    return this.lessonModel.findByIdAndUpdate(id, data, { new: true }).exec();
  }

  remove(id: string) {
    return this.lessonModel.findByIdAndDelete(id).exec();
  }
}
