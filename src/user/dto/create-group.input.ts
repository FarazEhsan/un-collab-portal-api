import { Field, InputType } from "@nestjs/graphql";

@InputType()

export class CreateGroupInput{

    @Field(() => String, {description: 'Name of the group'})
    name: string;
    
    @Field(() => String, {description: 'Code of the group'})
    description: string;
}