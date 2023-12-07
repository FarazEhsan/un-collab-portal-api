import { Module } from '@nestjs/common';
import { ForumEventsService } from './forum-events.service';
import { ForumEventsGateway } from './forum-events.gateway';

@Module({
  providers: [ForumEventsGateway, ForumEventsService],
})
export class ForumEventsModule {}
