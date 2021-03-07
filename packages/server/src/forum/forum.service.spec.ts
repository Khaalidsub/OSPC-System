import { MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { rootMongooseTestModule } from '../utils/mongo';
import { AnswerService } from './answer.service';
import { QuestionsResolver } from './question.resolver';
import { QuestionService } from './forum.service';
import { Answer, AnswerSchema } from './schemas/answer.schema';
import { Question, QuestionSchema } from './schemas/question.schema';
import { AnswersResolver } from './answer.resolver';

describe('ForumService', () => {
  let service: QuestionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        MongooseModule.forFeature([
          { name: Answer.name, schema: AnswerSchema },
          { name: Question.name, schema: QuestionSchema },
        ]),
        rootMongooseTestModule(),
      ],
      providers: [
        QuestionsResolver,
        QuestionService,
        AnswerService,
        AnswersResolver,
      ],
    }).compile();

    service = module.get<QuestionService>(QuestionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
