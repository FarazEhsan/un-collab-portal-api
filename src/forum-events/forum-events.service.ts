import { Injectable } from '@nestjs/common';
import { CreateForumEventDto } from './dto/create-forum-event.dto';
import { UpdateForumEventDto } from './dto/update-forum-event.dto';

@Injectable()
export class ForumEventsService {
  async create(createForumEventDto: CreateForumEventDto) {
    return 'This action adds a new forumEvent';
  }

  findAll() {
    return `This action returns all forumEvents`;
  }

  findOne(id: number) {
    return `This action returns a #${id} forumEvent`;
  }

  update(id: number, updateForumEventDto: UpdateForumEventDto) {
    return `This action updates a #${id} forumEvent`;
  }

  remove(id: number) {
    return `This action removes a #${id} forumEvent`;
  }
}
