import { Test, TestingModule } from '@nestjs/testing';
import { ForumEventsGateway } from './forum-events.gateway';
import { ForumEventsService } from './forum-events.service';

describe('ForumEventsGateway', () => {
  let gateway: ForumEventsGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ForumEventsGateway, ForumEventsService],
    }).compile();

    gateway = module.get<ForumEventsGateway>(ForumEventsGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
