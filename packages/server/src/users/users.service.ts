import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Role, Status } from '@common/enums';
import { Model } from 'mongoose';
import { User, UserDocument } from './entities/user.entity';
import * as mongoose from 'mongoose';
import { CoachLessons } from 'types';
import { CreateUserInput } from './dto/create-user.input';
const users: any[] = [
  {
    email: 'admin@gmail.com',
    name: 'admin',
    password: '123Zebra',
    university: 'UTM',
    role: Role.admin,
    accountStatus: Status.active,
  },
];

@Injectable()
export class UsersService {


  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  create(user: User) {
    const createdUser = new this.userModel(user);
    return createdUser.save();
  }
  populateData() {
    return new this.userModel(users[0]).save();
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

  countByQuery(query) {
    return this.userModel.find(query).count()
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
  findCoachesAndStudentLessons(
    id: string,
    subject?: string,
  ): Promise<CoachLessons[]> {
    const aggregate = this.userModel.aggregate([
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
          image: 1,
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
          image: 1,
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
      {
        $match: {
          lessons_taken: { $gt: 0 },
        },
      },
    ]);
    if (subject) {
      return aggregate
        .match({
          'subjectspecializations.subject': mongoose.Types.ObjectId(subject),
        })
        .exec();
    }
    return aggregate.exec();
  }
  findStudentLessons(id: string): Promise<CoachLessons[]> {
    return this.userModel
      .aggregate([
        {
          $lookup: {
            from: 'lessons',
            localField: '_id',
            foreignField: 'student',
            as: 'lessons',
          },
        },
        {
          $match: {
            role: 'STUDENT',
          },
        },
        {
          $project: {
            _id: 1,
            name: 1,
            email: 1,
            image: 1,
            lessons: {
              $filter: {
                input: '$lessons',
                as: 'lesson',
                cond: {
                  $eq: ['$$lesson.coach', mongoose.Types.ObjectId(id)],
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
            image: 1,
            lessons_given: {
              $size: '$lessons',
            },
          },
        },
        {
          $match: {
            lessons_given: { $gt: 0 },
          },
        },
      ])
      .exec();
  }
  findStudentMetrics(student: string) {
    return this.userModel.aggregate([
      {
        $match: {
          _id: mongoose.Types.ObjectId(student),
        },
      },
      {
        $lookup: {
          from: 'lessons',
          localField: '_id',
          foreignField: 'student',
          as: 'lessons',
        },
      },
      {
        $lookup: {
          from: 'questions',
          localField: '_id',
          foreignField: 'user',
          as: 'questions',
        },
      },
      {
        $lookup: {
          from: 'answers',
          localField: '_id',
          foreignField: 'user',
          as: 'answers',
        },
      },
      {
        $project: {
          _id: 1,
  
          lessons: {
            $size: '$lessons',
          },
          answers: {
            $size: '$answers',
          },
          questions: {
            $size: '$questions',
          },
        },
      },
    ]);
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
