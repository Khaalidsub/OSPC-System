import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Role } from '@common/enums';
import { Model } from 'mongoose';
import { User, UserDocument } from './entities/user.entity';
import * as mongoose from 'mongoose';
import { CoachLessons } from '../types/User';

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
  findByQuery(query: any) {
    return this.userModel.find(query);
  }

  findOne(query) {
    return this.userModel.findOne(query).exec();
  }

  findById(id: string) {
    return this.userModel.findById(id).exec();
  }

  update(id: string, data: any) {
    return this.userModel.findByIdAndUpdate(id, data, { new: true }).exec();
  }

  remove(id: string) {
    return this.userModel.findByIdAndDelete(id).exec();
  }
  findByIds(users: string[]) {
    return this.userModel.find({
      _id: {
        $in: users,
      },
    });
  }

  findAvailableModerators(users: string[]) {
    return this.userModel.find({
      _id: {
        $nin: users,
      },
      role: Role.moderator,
    });
  }
  findCoachesAndStudentLessons(id: string): Promise<CoachLessons[]> {
    return this.userModel
      .aggregate([
        {
          $lookup: {
            from: 'lessons',
            localField: '_id',
            foreignField: 'coach',
            as: 'lessons',
          },
        },
        {
          $match: {
            role: 'COACH',
          },
        },
        {
          $project: {
            _id: 1,
            name: 1,
            email: 1,
            lessons: {
              $filter: {
                input: '$lessons',
                as: 'lesson',
                cond: {
                  $eq: ['$$lesson.student', mongoose.Types.ObjectId(id)],
                },
              },
            },
          },
        },
        {
          $project: {
            _id: 1,
            name: 1,
            email: 1,
            lessons: 1,
            lessons_taken: {
              $size: '$lessons',
            },
          },
        },
        {
          $lookup: {
            from: 'subjectspecializations',
            localField: '_id',
            foreignField: 'coach',
            as: 'subjectspecializations',
          },
        },
        {
          $unwind: {
            path: '$subjectspecializations',
          },
        },
      ])
      .exec();
  }
  findCoachBySubject(subject: string) {
    return this.userModel.aggregate([
      {
        $lookup: {
          from: 'subjectspecializations',
          localField: '_id',
          foreignField: 'coach',
          as: 'subjectspecializations',
        },
      },
      {
        $match: {
          role: 'COACH',
          coachingStatus: 'ACTIVE',
        },
      },
      {
        $unwind: {
          path: '$subjectspecializations',
        },
      },
      {
        $match: {
          'subjectspecializations.subject': mongoose.Types.ObjectId(subject),
        },
      },
    ]);
  }
  async subjectSpecialization(id: string) {
    //  const user = await this.userModel.findById(id);

    return this.userModel
      .aggregate([
        {
          $lookup: {
            from: 'subjectspecializations',
            localField: '_id',
            foreignField: 'coach',
            as: 'specialization',
          },
          $match: {
            _id: mongoose.Types.ObjectId(id),
          },
          $unwind: {
            path: '$specialization',
          },
          //@ts-ignore
          $lookup: {
            from: 'subjects',
            localField: 'specialization.subject',
            foreignField: '_id',
            as: 'subject',
          },
          //@ts-ignore
          $unwind: {
            path: '$subject',
          },
        },
      ])
      .exec();
  }
}
