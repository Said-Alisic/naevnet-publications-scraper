import { Test, TestingModule } from '@nestjs/testing';
import { PublicationsResolver } from './publications.resolver';

describe('PublicationsResolver', () => {
  let resolver: PublicationsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PublicationsResolver],
    }).compile();

    resolver = module.get<PublicationsResolver>(PublicationsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
