import { Args, Int, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { Topic } from 'src/forum/schemas/topic.schema';
import { TopicService } from './topic.service';
import { CommentService } from '../comment/comment.service';
import { Comment } from '../schemas/comment.schema';


@Resolver(() => Topic)
export class TopicResolver {

    constructor(private readonly topicService:TopicService, private readonly commentService:CommentService){}

    @Query(() => [Topic], {name: 'alltopics'})
    findAll(){
        return this.topicService.findAll();
    }   

    @Query(() => Topic, {name: 'topic'})
    find(@Args('id', {type: ()=> String}) id: string){
        return this.topicService.findOne(id);
    }

    @ResolveField(('comments'), () => [Comment])
    getComments(@Parent() topic: Topic,  @Args('limit', { type: () => Int, nullable: true }) limit: number, @Args('skip', { type: () => Int, nullable: true }) skip: number){
        const { _id } = topic;
        return this.commentService.findAllByTopic({ topic: _id.toString() }, limit, skip);
    }

    @ResolveField(('commentsCount'), () => Int)
    getCommentsCount(@Parent() topic: Topic){
        const { _id } = topic;
        return this.commentService.countAllByTopic({ topic: _id.toString() });
    }
}