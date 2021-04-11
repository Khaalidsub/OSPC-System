import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCoachApplicationInput } from './dto/create-coach-application.input';
import {
  CoachApplication,
  CoachApplicationDocument,
} from './entities/coach-application.entity';
@Injectable()
export class CoachApplicationService {
  constructor(
    @InjectModel(CoachApplication.name)
    private coachModel: Model<CoachApplicationDocument>,
  ) {}

  save(creaCoachApplication: CreateCoachApplicationInput) {
    return new this.coachModel(creaCoachApplication).save();
  }
}
