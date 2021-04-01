import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateDepartmentInput } from './dto/create-department.input';
import { Department, DepartmentDocument } from './entities/department.entity';
import * as mongoose from 'mongoose';

@Injectable()
export class DepartmentsService {
  constructor(
    @InjectModel(Department.name)
    private departmentModel: Model<DepartmentDocument>,
  ) {}
  create(createSubjectInput: CreateDepartmentInput) {
    const newDepartment = new this.departmentModel(createSubjectInput);

    return newDepartment.save();
  }

  findAll() {
    return this.departmentModel.find().exec();
  }

  findOne(query) {
    return this.departmentModel.findOne(query).exec();
  }
  findById(id: string) {
    return this.departmentModel.findById(id).exec();
  }

  update(id: string, data: any) {
    return this.departmentModel
      .findByIdAndUpdate(id, data, { new: true })
      .exec();
  }

  remove(id: string) {
    return this.departmentModel.findByIdAndDelete(id).exec();
  }
  findModerators() {
    return this.departmentModel
      .find({})
      .select('-_id -name -description')
      .exec();
  }

  subjects(id: string) {
    return this.departmentModel
      .aggregate([
        {
          $lookup: {
            from: 'subjects',
            localField: '_id',
            foreignField: 'department',
            as: 'subjects',
          },
        },
        {
          $match: {
            _id: mongoose.Types.ObjectId(id),
          },
        },
      ])
      .exec();
  }
}
