import { AdminGuard } from './graph-admin.auth.guard';

describe('AdminGuard', () => {
  it('should be defined', () => {
    expect(new AdminGuard()).toBeDefined();
  });
});
