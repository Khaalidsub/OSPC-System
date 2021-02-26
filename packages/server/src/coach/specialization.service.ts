import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateSubjecSpecialization } from './dto/create-coach.input';
import {
  SubjectSpecialization,
  SubjectSpecializationDocument,
} from './schemas/coach.schema';

@Injectable()
export class SubjectSpecializationService {
  constructor(
    @InjectModel(SubjectSpecialization.name)
    private subjectSpecializationModel: Model<SubjectSpecializationDocument>,
  ) {}
  create(subjectSpecialization: CreateSubjecSpecialization) {
    const newSpecialization = new this.subjectSpecializationModel(
      subjectSpecialization,
    );

    return newSpecialization.save();
  }

  findAll() {
    return this.subjectSpecializationModel.find().exec();
  }

  findOne(query) {
    return this.subjectSpecializationModel.findOne(query).exec();
  }
  findByQuery(query) {
    return this.subjectSpecializationModel.find(query).exec();
  }
  findById(id: string) {
    return this.subjectSpecializationModel.findById(id).exec();
  }

  update(id: string, data: any) {
    return this.subjectSpecializationModel
      .findByIdAndUpdate(id, data, { new: true })
      .exec();
  }

  remove(id: string) {
    return this.subjectSpecializationModel.findByIdAndDelete(id).exec();
  }
}
