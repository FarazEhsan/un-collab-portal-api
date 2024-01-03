import { Field, ID, InputType } from "@nestjs/graphql";



@InputType()
export class CreateProjectInput {

    @Field(() => String, {description: 'Name of the project'})
    name: string;

    @Field(()=> String, {description: 'Project Start time'} )
    startTime:String

    @Field(()=> String, {description: 'Project end time', nullable:true, defaultValue:''} )
    endTime:String

    @Field(() => String, {description: 'Description of the project'})
    description: string;

    @Field(() => [String], {description: 'Related SDGs of the project', nullable: true, defaultValue: []})
    relatedSDGs:string[]

    @Field(() => [String], {description: 'Pictures', nullable: true, defaultValue: []})
    pictures:string[]

    @Field(() => ID, {description: 'User who created the project'})
    user: string
}