import { Test, TestingModule } from '@nestjs/testing';
import { GallaryService } from './gallary.service';

describe('GallaryService', () => {
  let service: GallaryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GallaryService],
    }).compile();

    service = module.get<GallaryService>(GallaryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
