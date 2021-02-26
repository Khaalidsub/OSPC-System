import { ModeratorGuard } from './graph-moderator.auth.guard';

describe('ModeratorGuard', () => {
  it('should be defined', () => {
    expect(new ModeratorGuard()).toBeDefined();
  });
});
