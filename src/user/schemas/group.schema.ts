import { Field, ID, ObjectType } from "@nestjs/graphql";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { Base } from "src/base/base.schema";




export type GroupDocument = HydratedDocument<Group>

@Schema()
@ObjectType()
export class Group extends Base{

    @Field(() => ID, {description: 'ID of the group'})
    _id: string;
    @Field(() => String, {description: 'Name of the group'})
    @Prop({required: true})
    name: string;
    @Field(() => String, {description: 'Code of the group'})
    @Prop({required: true})
    description: string;
}

export const GroupSchema = SchemaFactory.createForClass(Group);