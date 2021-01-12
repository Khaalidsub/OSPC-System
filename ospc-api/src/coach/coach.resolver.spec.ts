import { Test, TestingModule } from '@nestjs/testing';
import { CoachResolver } from './coach.resolver';
import { CoachService } from './coach.service';

describe('CoachResolver', () => {
  let resolver: CoachResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CoachResolver, CoachService],
    }).compile();

    resolver = module.get<CoachResolver>(CoachResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
