import { Field, ID, InputType } from "@nestjs/graphql";

@InputType()
export class UpdateProjectInput{

    @Field(()=> String, {description: 'Name of the project', nullable:true})
    name?: string;

    @Field(()=> String, {description: 'Project Start time', nullable:true})
    startTime?:String

    @Field(()=> String, {description: 'Project end time', nullable:true})
    endTime?:String

    @Field(() => String, {description: 'Description of the project', nullable:true})
    description?: string;

    @Field(() => [String], {description: 'Related SDGs of the project', nullable: true})
    relatedSDGs?:string[]

    @Field(() => [String], {description: 'Pictures', nullable: true})
    pictures?:string[]

    @Field(() => ID, {description: 'User who created the project', nullable:true})
    user?: string
}