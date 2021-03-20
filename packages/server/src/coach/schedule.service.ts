import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  WeeklySchedule,
  WeeklyScheduleDocument,
} from './entities/schedule.entity';

@Injectable()
export class ScheduleService {
  constructor(
    @InjectModel(WeeklySchedule.name)
    private weeklyScheduleModel: Model<WeeklyScheduleDocument>,
  ) {}
  create(weeklySchedule: WeeklySchedule) {
    const newWeeklySchedule = new this.weeklyScheduleModel(weeklySchedule);

    return newWeeklySchedule.save();
  }

  findAll() {
    return this.weeklyScheduleModel.find().exec();
  }

  findOne(query) {
    return this.weeklyScheduleModel.findOne(query).exec();
  }
  findByQuery(query) {
    return this.weeklyScheduleModel.find(query).exec();
  }
  findById(id: string) {
    return this.weeklyScheduleModel.findById(id).exec();
  }

  update(id: string, data: any) {
    return this.weeklyScheduleModel
      .findByIdAndUpdate(id, data, { new: true })
      .exec();
  }

  remove(id: string) {
    return this.weeklyScheduleModel.findByIdAndDelete(id).exec();
  }
}
