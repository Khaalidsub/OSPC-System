import { Test, TestingModule } from '@nestjs/testing';
import { PaymentResolver } from './payment.resolver';
import { PaymentService } from './payment.service';

describe('PaymentResolver', () => {
  let resolver: PaymentResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PaymentResolver, PaymentService],
    }).compile();

    resolver = module.get<PaymentResolver>(PaymentResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
