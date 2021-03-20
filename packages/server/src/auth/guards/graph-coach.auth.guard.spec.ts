import { CoachGuard } from './graph-coach.auth.guard';

describe('CoachGuard', () => {
  it('should be defined', () => {
    expect(new CoachGuard()).toBeDefined();
  });
});
