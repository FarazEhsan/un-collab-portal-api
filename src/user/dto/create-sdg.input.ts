import { Field,InputType } from "@nestjs/graphql"


@InputType()
export class CreateSDGInput {

    @Field(() => String, {description: 'Name of the SDG'})
    name: string

    @Field(() => String, {description: 'Code of the SDG'})
    code: string

    @Field(() => String, {description: 'Short description of the SDG'})
    shortDescription:string

    @Field(() => String, {description: 'Description of the SDG', nullable: true, defaultValue: ''})
    description?: string

    @Field(()=> [String], {description: 'Pictures related to the SDG', nullable: true, defaultValue: []})
    pictures?: string[]
}