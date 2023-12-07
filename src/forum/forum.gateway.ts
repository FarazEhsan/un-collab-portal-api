import { WebSocketGateway, SubscribeMessage, MessageBody, WebSocketServer, ConnectedSocket } from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { ForumService } from './forum.service';
import { CreateForumDto } from './dto/create-forum.dto';
import { UpdateForumDto } from './dto/update-forum.dto';
//how do I access the cleint in this WebSocketGateway?
@WebSocketGateway()
export class ForumGateway {
  constructor(private readonly forumEventsService: ForumService) {}

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
  async create(@MessageBody() createForumEventDto: CreateForumDto, @ConnectedSocket() client: Socket) {
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
  update(@MessageBody() updateForumEventDto: UpdateForumDto) {
    return this.forumEventsService.update(updateForumEventDto.id, updateForumEventDto);
  }

  @SubscribeMessage('removeForumEvent')
  remove(@MessageBody() id: number) {
    return this.forumEventsService.remove(id);
  }
}
