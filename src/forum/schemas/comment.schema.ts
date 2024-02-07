import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";
import { Base } from "src/base/base.schema";
import { Reaction } from "./reaction.schema";
import { Field, ID, ObjectType } from "@nestjs/graphql";
import { Topic } from "./topic.schema";
import { User } from "src/user/schemas/user.schema";
import { ReactionCount } from "../reaction/reactioncount.model";





export type CommentDocument = HydratedDocument<Comment>
@Schema()
@ObjectType()
export class Comment extends Base {

    @Field(() => ID, {description:'Id of the topic'})
    _id: string; 

    @Field(() => String, {description:'Text of the comment'})   
    @Prop({required: true, length:1000})
    text:string

    @Field(() => User, {description:'Author/User of the comment'})
    @Prop({required: true, type: Types.ObjectId, ref: 'User'})
    author: string

    @Field(() => Topic, {description:'Topic of the comment'})
    @Prop({required: true, type: Types.ObjectId, ref: 'Topic', index: true})
    topic: string

    @Field(() => Comment, {description:'Parent comment of the comment', nullable: true})
    @Prop({required: false, type: Types.ObjectId, ref: 'Comment'})
    parentComment?: string
    
    @Field(() => [Reaction], {description:'Reactions of the comment'})
    reactions?: Reaction[]

    @Field(() => [ReactionCount], {description:'Number of upvotes/downvotes'})
    reactionCounts: ReactionCount[]

}

export const CommentSchema = SchemaFactory.createForClass(Comment);