import { WebSocketGateway, SubscribeMessage, MessageBody, WebSocketServer, ConnectedSocket } from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { ForumService } from './forum.service';
import { CreateForumDto } from './dto/create-forum.dto';
import { UpdateForumDto } from './dto/update-forum.dto';
import { CommentService } from './comment/comment.service';
import { CreateCommentDTO } from './comment/dto/create-comment-dto';
import { TopicService } from './topic/topic.service';
import { CreateTopicDto } from './topic/dto/create-topic-dto';
import { ReactionService } from './reaction/reaction.service';
import { CreateReactionDTO } from './reaction/dto/create-reaction-dto';

@WebSocketGateway()
export class ForumGateway {
  constructor(private readonly forumEventsService: ForumService,private readonly topicService: TopicService, private readonly commentService: CommentService, private readonly reactionService:ReactionService) {}

  @WebSocketServer()
  server: Server;


  @SubscribeMessage('joinForum')
  async joinRoom(@MessageBody() topic: string, @ConnectedSocket() client: Socket) {
    console.log('Room is', topic)
    client.join(topic);
    client.to(topic).emit('joinedForum', topic);
    console.log('joined room', topic);
    return topic;
  }

  @SubscribeMessage('postTopic')
  async createTopic(@MessageBody() postTopicDTO:CreateTopicDto ) {
    const newTopic= await this.topicService.create(postTopicDTO);
    console.log('new topic', newTopic);
    this.server.emit('topicPosted', postTopicDTO);
    return newTopic;
  }

  @SubscribeMessage('postComment')
  async createComment(@MessageBody() createCommentDTO: CreateCommentDTO, @ConnectedSocket() client: Socket) {
    console.log('got the message from client', createCommentDTO);
    await this.commentService.create(createCommentDTO);
    this.server.to(createCommentDTO.topic).emit('commentPosted', createCommentDTO);
    return createCommentDTO
  }

  @SubscribeMessage('postReaction')
  async createReaction(@MessageBody() createReactionDTO: CreateReactionDTO, @ConnectedSocket() client: Socket) {
    console.log('got the message from client', createReactionDTO);
    await this.reactionService.create(createReactionDTO);
    this.server.to(createReactionDTO.topic).emit('reactionPosted', createReactionDTO);
    return createReactionDTO
  }
  @SubscribeMessage('findAllForumEvents')
  findAll() {
    return this.forumEventsService.findAll();
  }

  @SubscribeMessage('findOneForumEvent')
  findOne(@MessageBody() id: number) {
    return this.forumEventsService.findOne(id);
  }

  @SubscribeMessage('updateForumEvent')
  update(@MessageBody() updateForumEventDto: UpdateForumDto) {
    return this.forumEventsService.update(updateForumEventDto.id, updateForumEventDto);
  }

  @SubscribeMessage('removeForumEvent')
  remove(@MessageBody() id: number) {
    return this.forumEventsService.remove(id);
  }
}
