import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { CreateTopicDto } from './dto/create-topic-dto';
import { TopicService } from './topic.service';
import { Server } from 'socket.io';

@WebSocketGateway()
export class TopicGateway {
  constructor(private readonly topicService: TopicService) {}

  @WebSocketServer()
  server:Server;

  @SubscribeMessage('postTopic')
  async create(@MessageBody() postTopicDTO:CreateTopicDto ) {
    const newTopic= await this.topicService.create(postTopicDTO);
    console.log('new topic', newTopic);
    this.server.emit('topicPosted', postTopicDTO);
    return newTopic;
  }
}
