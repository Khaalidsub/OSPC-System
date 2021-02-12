import { Injectable } from '@nestjs/common';
import { CreateQuestionInput } from './dto/create-forum.input';
import { UpdateQuestionInput } from './dto/update-forum.input';

@Injectable()
export class ForumService {
  create(createForumInput: CreateQuestionInput) {
    return 'This action adds a new forum';
  }

  findAll() {
    return `This action returns all forum`;
  }

  findOne(id: string) {
    return `This action returns a #${id} forum`;
  }

  update(id: string, updateForumInput: UpdateQuestionInput) {
    return `This action updates a #${id} forum`;
  }

  remove(id: string) {
    return `This action removes a #${id} forum`;
  }
}
