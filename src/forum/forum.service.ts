import { Injectable } from '@nestjs/common';
import { CreateForumDto } from './dto/create-forum.dto';
import { UpdateForumDto } from './dto/update-forum.dto';

@Injectable()
export class ForumService {
  async create(createForumEventDto: CreateForumDto) {
    return 'This action adds a new forumEvent';
  }

  findAll() {
    return `This action returns all forumEvents`;
  }

  findOne(id: number) {
    return `This action returns a #${id} forumEvent`;
  }

  update(id: number, updateForumEventDto: UpdateForumDto) {
    return `This action updates a #${id} forumEvent`;
  }

  remove(id: number) {
    return `This action removes a #${id} forumEvent`;
  }
}
