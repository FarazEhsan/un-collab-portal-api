
import { Args, Mutation, ObjectType, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { CreateCommentDTO } from './dto/create-comment-dto';
import { CommentService } from './comment.service';
import { Comment } from '../schemas/comment.schema';
import { User } from 'src/user/schemas/user.schema';
import { UserService } from 'src/user/user.service';
import { ReactionService } from '../reaction/reaction.service';
import { Reaction } from '../schemas/reaction.schema';
import { ReactionCount } from '../reaction/reactioncount.model';




@Resolver(()=> Comment)
export class CommentResolver {

    constructor(private readonly commentService:CommentService, private readonly userService:UserService, private readonly reactionService: ReactionService){}
    @Mutation(() => Comment)
    createComment(@Args('createCommentInput') createCommentInput: CreateCommentDTO) { 
        return this.commentService.create(createCommentInput);
    }

    @Query(() => [Comment], {name: 'allcomments'})
    findAll(){
      return this.commentService.findAll();
    }

    @Query(() => Comment, {name: 'comment'})
    findOne(@Args('id', {type: () => String}) id: string){
      return this.commentService.findOne(id);
    }

    @ResolveField('author', () => User)
    async getAuthor(@Parent() comment: Comment) {
        const { author } = comment;
        console.log('author in comment resolver', author)
        return this.userService.findOne(author);
    }

    @ResolveField(('reactions'), () => [Reaction])
    getReactions(@Parent() comment: Comment){
        const { _id } = comment;
        return this.reactionService.findAllByComment(_id.toString());
    }

    @ResolveField(('parentComment'),()=>Comment, {nullable: true})
    getParentComment(@Parent() comment: Comment){
        const { parentComment } = comment;
        if(comment.parentComment){
          console.log('parentComment in comment resolver', parentComment)
          return this.commentService.findOne(parentComment);
        }
        return null
        
    }

    @ResolveField(('reactionCounts'), () => ReactionCount)
    getUpVotes(@Parent() comment: Comment){
        const { _id } = comment;
        return this.reactionService.findTotalCommentUpvotesAndDownvotes(_id.toString());
    }

}
