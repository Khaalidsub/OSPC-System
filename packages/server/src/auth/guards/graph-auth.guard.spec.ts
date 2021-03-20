import { GqlAuthGuard } from './graph-auth.guard';

describe('GqlGuard', () => {
  it('should be defined', () => {
    expect(new GqlAuthGuard()).toBeDefined();
  });
});
