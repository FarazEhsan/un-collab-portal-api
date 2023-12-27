import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { HydratedDocument } from "mongoose";
import { Base } from "src/base/base.schema";


export type ProjectDocument = HydratedDocument<Project>

@ObjectType()
@InputType('ProjectInput')
export class Project {
    @Field(() => String, {description: 'Name of the project'})
    name: string;
    @Field(() => String, {description: 'Description of the project'})
    description: string;
    @Field(() => String, {description: 'Related SDGs of the project', nullable: true, defaultValue: ''})
    relatedSDGs:string[]
    @Field(() => String, {description: 'Pictures', nullable: true, defaultValue: ''})
    pictures:string[]
}