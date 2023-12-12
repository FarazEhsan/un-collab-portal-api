import { Module } from '@nestjs/common';
import { ForumService } from './forum.service';
import { ForumGateway } from './forum.gateway';
import { MongooseModule } from '@nestjs/mongoose';
import { TopicSchema } from './schemas/topic.schema';
import { TopicService } from './topic/topic.service';
import { CommentResolver } from './comment/comment.resolver';
import { CommentService } from './comment/comment.service';
import { CommentSchema } from './schemas/comment.schema';
import { TopicResolver } from './topic/topic-resolver';
import { UserService } from 'src/user/user.service';
import { UserSchema } from 'src/user/schemas/user.schema';
import { ReactionService } from './reaction/reaction.service';
import { ReactionSchema } from './schemas/reaction.schema';
import { ReactionResolver } from './reaction/reaction.resolver';




@Module({
  imports:[MongooseModule.forFeature([{name: 'Topic', schema: TopicSchema}, {name:'Comment', schema:CommentSchema}, 
  {name: 'User', schema: UserSchema}, {name: 'Reaction', schema:ReactionSchema}])],
  providers: [ForumGateway, ForumService, TopicService, TopicResolver, CommentResolver, CommentService, UserService, ReactionService, ReactionResolver],
})
export class ForumModule {}
