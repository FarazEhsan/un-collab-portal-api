import { PartialType } from '@nestjs/mapped-types';
import { CreateForumEventDto } from './create-forum-event.dto';

export class UpdateForumEventDto extends PartialType(CreateForumEventDto) {
  id: number;
}
