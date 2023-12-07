import { WebSocketGateway, SubscribeMessage, MessageBody, WebSocketServer, ConnectedSocket } from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { ForumEventsService } from './forum-events.service';
import { CreateForumEventDto } from './dto/create-forum-event.dto';
import { UpdateForumEventDto } from './dto/update-forum-event.dto';
//how do I access the cleint in this WebSocketGateway?
@WebSocketGateway()
export class ForumEventsGateway {
  constructor(private readonly forumEventsService: ForumEventsService) {}

  @WebSocketServer()
  server: Server;


  @SubscribeMessage('joinRoom')
  async joinRoom(@MessageBody() room: string, @ConnectedSocket() client: Socket) {
    console.log('Room is', room)
    client.join(room);
    client.emit('joinedRoom', room);
    console.log('joined room', room);
    return room;
  }

  @SubscribeMessage('createForumComment')
  async create(@MessageBody() createForumEventDto: CreateForumEventDto, @ConnectedSocket() client: Socket) {
    //await this.forumEventsService.create(createForumEventDto)
    console.log('got the message from client', createForumEventDto.comment);
    this.server.to(createForumEventDto.room).emit('createForumComment', createForumEventDto);
    return createForumEventDto
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
  update(@MessageBody() updateForumEventDto: UpdateForumEventDto) {
    return this.forumEventsService.update(updateForumEventDto.id, updateForumEventDto);
  }

  @SubscribeMessage('removeForumEvent')
  remove(@MessageBody() id: number) {
    return this.forumEventsService.remove(id);
  }
}
