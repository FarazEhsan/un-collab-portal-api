import { Test, TestingModule } from '@nestjs/testing';
import { ForumEventsService } from './forum-events.service';

describe('ForumEventsService', () => {
  let service: ForumEventsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ForumEventsService],
    }).compile();

    service = module.get<ForumEventsService>(ForumEventsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
