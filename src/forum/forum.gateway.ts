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
import { ReactionType } from 'src/enum';

interface Author {
  _id: string;
  userName: string;
}

interface Comment {
  _id: any;
  updOperation: number;
  text: string;
  author: Author;
  topic: string;
  parentComment: null | string; 
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}

interface User {
  __typename: "User";
  _id: string;
}

interface Reaction {
  __typename: "Reaction";
  type: ReactionType;
  user: User;
}
interface PopulatedComment extends Omit<Comment, 'author'> {
  author: Author;
}

@WebSocketGateway({ cors: true })


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
    const newComment= await this.commentService.create(createCommentDTO) as unknown as PopulatedComment[];
    const newCommentFormatted= 
    {
      _id: newComment[0]._id.toString(),
      text: newComment[0].text,
      createdAt: newComment[0].createdAt,
      author: {
        userName: newComment[0].author.userName,
        __typename: "User"
      },
      parentComment: newComment[0].parentComment,
      __typename: "Comment"
    }
    this.server.to(createCommentDTO.topic).emit('commentPosted', newCommentFormatted);
    return createCommentDTO
  }

  @SubscribeMessage('postCommentReaction')
  async createCommentReaction(@MessageBody() createReactionDTO: CreateReactionDTO, @ConnectedSocket() client: Socket) {
    console.log('got the message from client', createReactionDTO);
    const newReaction= await this.reactionService.create(createReactionDTO);
    const newReactionFormatted ={
      _id: newReaction._id.toString(),
      type: newReaction.type,
      comment: newReaction.comment,
      user: {
        _id: newReaction.user.toString(),
        __typename: "User"
      },
      __typename: "Reaction"
    }
    this.server.to(createReactionDTO.topic).emit('commentReactionPosted', newReactionFormatted);
    console.log('new reaction', newReactionFormatted);
    return createReactionDTO
  }

  @SubscribeMessage('postTopicReaction')
  async createTopicReaction(@MessageBody() createReactionDTO: CreateReactionDTO, @ConnectedSocket() client: Socket) {
    console.log('got the message from client', createReactionDTO);
    const newReaction= await this.reactionService.create(createReactionDTO);
    const newReactionFormatted ={
      _id: newReaction._id.toString(),
      type: newReaction.type,
      user: {
        _id: newReaction.user.toString(),
        __typename: "User"
      },
      __typename: "Reaction"
    }
    this.server.to(createReactionDTO.topic).emit('topicReactionPosted', newReactionFormatted);
    console.log('new reaction', newReactionFormatted);
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
