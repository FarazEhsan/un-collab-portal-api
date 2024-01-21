import { Field, ID, Int, ObjectType } from "@nestjs/graphql";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";
import { Base } from "src/base/base.schema";
import { User } from "src/user/schemas/user.schema";
import { Comment } from "./comment.schema";



export type TopicDocument = HydratedDocument<Topic>

@Schema()
@ObjectType()
export class Topic extends Base {

    @Field(() => ID, {description:'Id of the topic'})
    _id: string; 
    @Prop({required: true, length:220})
    @Field(() => String, {description:'Title of the topic'})
    title: string;

    @Prop({required: true, length:1000})
    @Field(() => String, {description:'Description of the topic'})
    description: string;

    @Field(() => User, {description:'Author of the topic'})
    @Prop({required: true, type: Types.ObjectId, ref: 'User'})
    author: string

    @Field(() => [String], {description:'Images related to the topic', nullable: true})
    @Prop({required: false})
    images: string[]

    @Field(() => [Comment], {description: 'Comments related to the Forum', nullable: true})
    comments: Comment[]

    @Field (() => Int, {description: 'Number of comments related to the Forum', nullable: true})
    commentsCount: number

}

export const TopicSchema = SchemaFactory.createForClass(Topic);
