import { Module } from '@nestjs/common';
import { ForumService } from './forum.service';
import { ForumGateway } from './forum.gateway';
import { TopicGateway } from './topic/topic.gateway';
import { MongooseModule } from '@nestjs/mongoose';
import { TopicSchema } from './schemas/topic.schema';
import { TopicService } from './topic/topic.service';
import { TopicResolver } from './topic/resolvers/topic-resolver';



@Module({
  imports:[MongooseModule.forFeature([{name: 'Topic', schema: TopicSchema}])],
  providers: [ForumGateway, ForumService, TopicGateway, TopicService, TopicResolver],
})
export class ForumModule {}
