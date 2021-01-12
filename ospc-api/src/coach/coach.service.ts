import { Injectable } from '@nestjs/common';
import { CreateCoachInput } from './dto/create-coach.input';
import { UpdateCoachInput } from './dto/update-coach.input';

@Injectable()
export class CoachService {
  // constructor(
  //   @InjectModel(Coach.name)
  //   private CoachModel: Model<CoachDocument>,
  // ) {}
  create(createCoachInput: CreateCoachInput) {
    return 'This action adds a new coach';
  }

  findAll() {
    return `This action returns all coach`;
  }

  findOne(id: string) {
    return `This action returns a #${id} coach`;
  }

  update(id: string, data: any) {
    // return this.CoachModel.findByIdAndUpdate(id, data).exec();
  }

  remove(id: number) {
    return `This action removes a #${id} coach`;
  }
}
