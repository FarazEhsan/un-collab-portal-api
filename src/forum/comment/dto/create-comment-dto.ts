import { Field, ID, InputType } from "@nestjs/graphql"
import { Reaction } from "src/forum/schemas/reaction.schema"
import { Topic } from "src/forum/schemas/topic.schema"
import { User } from "src/user/schemas/user.schema"

@InputType()
export class CreateCommentDTO{
    @Field(() => String, {description:'Text of the comment'})   
    text:string

    @Field(() => ID, {description:'Author/User of the comment'})
    author: string

    @Field(() => ID, {description:'Topic of the comment'})
    topic: string

    @Field(() => ID, {description:'Parent comment of the comment'})
    parentComment?: string
    
    @Field(() => [ID], {description:'Reactions of the comment'})
    reactions?: string[]
}