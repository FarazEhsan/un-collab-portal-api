import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class CreateSkillInput{
    @Field(() => String, {description:'Name of the skill'})
    name: string;
    @Field(() => String, {description:'Level of the skill'})
    level: string;  
}

