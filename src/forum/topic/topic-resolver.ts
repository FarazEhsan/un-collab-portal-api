import { Args, Int, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { Topic } from 'src/forum/schemas/topic.schema';
import { TopicService } from './topic.service';
import { CommentService } from '../comment/comment.service';
import { Comment } from '../schemas/comment.schema';
import { User } from 'src/user/schemas/user.schema';
import { UserService } from 'src/user/user.service';
import { Reaction } from '../schemas/reaction.schema';
import { ReactionService } from '../reaction/reaction.service';
import { ReactionCount } from '../reaction/reactioncount.model';



@Resolver(() => Topic)
export class TopicResolver {

    constructor(private readonly topicService:TopicService, private readonly commentService:CommentService, private readonly userService:UserService,private readonly reactionService: ReactionService){}

    @Query(() => [Topic], {name: 'alltopics'})
    findAll(){
        return this.topicService.findAll();
    }   

    @Query(() => Topic, {name: 'topic'})
    find(@Args('id', {type: ()=> String}) id: string){
        return this.topicService.findOne(id);
    }
    @ResolveField(('reactions'), () => [Reaction])
    getReactions(@Parent() topic: Topic){
        const _id  = topic._id;
        return this.reactionService.findAllByTopic(_id.toString());
    }

    @ResolveField('author', () => User)
    async getAuthor(@Parent() comment: Comment) {
        const { author } = comment;
        console.log('author in comment resolver', author)
        return this.userService.findOne(author);
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

    @ResolveField(('reactionCounts'), () => [ReactionCount])
    getUpVotes(@Parent() topic: Topic){
        const { _id } = topic;
        return this.reactionService.findTotalTopicUpvotesAndDownvotes(_id.toString());
    }
}
