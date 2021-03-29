import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Subject } from 'rxjs';
import { CreateSubjectInput } from './dto/create-subject.input';
import { SubjectDocument } from './entities/subject.entity';

@Injectable()
export class SubjectsService {
  constructor(
    @InjectModel(Subject.name) private subjectModel: Model<SubjectDocument>,
  ) {}
  create(createSubjectInput: CreateSubjectInput) {
    const newSubject = new this.subjectModel(createSubjectInput);

    return newSubject.save();
  }

  findAll() {
    return this.subjectModel.find().exec();
  }

  findOne(query) {
    return this.subjectModel.findOne(query).exec();
  }
  findByQuery(query) {
    return this.subjectModel.find(query);
  }
  findById(id: string) {
    return this.subjectModel.findById(id).exec();
  }

  update(id: string, data: any) {
    return this.subjectModel.findByIdAndUpdate(id, data, { new: true }).exec();
  }

  remove(id: string) {
    return this.subjectModel.findByIdAndDelete(id).exec();
  }
  subjectCount(departmentId: string) {
    return this.subjectModel.count({ department: departmentId });
  }
}
