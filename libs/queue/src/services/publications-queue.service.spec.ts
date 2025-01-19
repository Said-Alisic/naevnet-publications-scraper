import { Test, TestingModule } from '@nestjs/testing';
import { PublicationsQueue } from './publications-queue.service';

describe('PublicationsQueue', () => {
  let service: PublicationsQueue;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PublicationsQueue],
    }).compile();

    service = module.get<PublicationsQueue>(PublicationsQueue);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
