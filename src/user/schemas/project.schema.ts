import { Field, ID, ObjectType } from "@nestjs/graphql";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";
import { Base } from "src/base/base.schema";
import { SDG } from "./sdg.schema";
import { User } from "./user.schema";


export type ProjectDocument = HydratedDocument<Project>


@ObjectType()
@Schema()
export class Project extends Base {

    @Field(() => ID, {description: 'ID of the project'})
    _id: string;
    
    @Field(() => String, {description: 'Name of the project'})
    @Prop({required: true})
    name: string;

    @Field(()=> String, {description: 'Project Start time'} )
    @Prop({required: true})
    startTime:String

    @Field(()=> String, {description: 'Project end time', nullable:true, defaultValue:''} )
    @Prop({required: false})
    endTime:String

    @Field(() => String, {description: 'Description of the project'})
    @Prop({required: true})
    description: string;

    @Field(() => [SDG], {description: 'Related SDGs of the project', nullable: true, defaultValue: []})
    @Prop({required: false, nullable: true, default: []})
    relatedSDGs:string[]

    @Field(() => [String], {description: 'Pictures', nullable: true, defaultValue: []})
    @Prop({required: false, nullable: true, default: []})
    pictures:string[]

    @Field(() => User, {description: 'User who created the project'})
    @Prop({type: Types.ObjectId, ref: 'User', required: true})
    user: string
}

export const ProjectSchema = SchemaFactory.createForClass(Project)