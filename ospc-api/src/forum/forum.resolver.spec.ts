import { Test, TestingModule } from '@nestjs/testing';
import { ForumResolver } from './forum.resolver';
import { QuestionService } from './forum.service';

describe('ForumResolver', () => {
  let resolver: ForumResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ForumResolver, QuestionService],
    }).compile();

    resolver = module.get<ForumResolver>(ForumResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
