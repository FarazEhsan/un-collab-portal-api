import { Field, ObjectType } from "@nestjs/graphql"
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { HydratedDocument, Types } from "mongoose"
import { Comment } from "./comment.schema"
import { User } from "src/user/schemas/user.schema"
import { ReactionType } from "src/enum"
import { Base } from "src/base/base.schema"


export type ReactionDocument= HydratedDocument<Reaction>

@Schema()
@ObjectType()

export class Reaction extends Base {


    @Field(() => String, {description:'Type of the reaction enum: [UPVOTE, DOWNVOTE]'})
    @Prop({required: true, enum: ReactionType})
    type:string

    @Field(() => User, {description:'User of the reaction'})
    @Prop({required: true, type: Types.ObjectId, ref: 'User'})
    user:string

    @Field(() => Comment, {description:'Comment of the reaction', nullable:true})
    @Prop({required:false, type: Types.ObjectId, ref: 'Comment'})
    comment?:string

    @Field(() => String, {description:'Topic of the reaction', nullable:true})
    @Prop({required:false, type: Types.ObjectId, ref: 'Topic'})
    topic?:string
}

export const ReactionSchema =SchemaFactory.createForClass(Reaction)