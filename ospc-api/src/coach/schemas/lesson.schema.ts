import { Subject } from 'src/subjects/entities/subject.entity';
import { IUser } from 'src/users/types';
import { ILesson } from '../types';

export class Lesson implements ILesson {
  subject: Subject;
  coach: IUser;
  student: IUser;
  date: Date;
  time_start: number;
  duration: number;
}
