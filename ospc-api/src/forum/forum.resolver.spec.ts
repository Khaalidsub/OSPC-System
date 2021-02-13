import { MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { rootMongooseTestModule } from '../util/mongo';
import { AnswerService } from './answer.service';
import { ForumResolver } from './forum.resolver';
import { QuestionService } from './forum.service';
import { Answer, AnswerSchema } from './schemas/answer.schema';
import { Question, QuestionSchema } from './schemas/question.schema';

describe('ForumResolver', () => {
  let resolver: ForumResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        MongooseModule.forFeature([
          { name: Answer.name, schema: AnswerSchema },
          { name: Question.name, schema: QuestionSchema },
        ]),
        rootMongooseTestModule(),
      ],
      providers: [ForumResolver, QuestionService, AnswerService],
    }).compile();

    resolver = module.get<ForumResolver>(ForumResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
