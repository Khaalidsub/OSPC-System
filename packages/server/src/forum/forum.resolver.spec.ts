import { MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { rootMongooseTestModule } from '../utils/mongo';
import { AnswerService } from './answer.service';
import { QuestionsResolver } from './question.resolver';
import { QuestionService } from './forum.service';
import { AnswersResolver } from './answer.resolver';
import { Answer, AnswerSchema } from './entities/answer.entity';
import { Question, QuestionSchema } from './entities/forum.entity';

describe('ForumResolver', () => {
  let resolver: QuestionsResolver;

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

    resolver = module.get<QuestionsResolver>(QuestionsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
