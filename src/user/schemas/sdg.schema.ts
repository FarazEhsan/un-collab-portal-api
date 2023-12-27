import { Field, ID, ObjectType } from "@nestjs/graphql"
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { HydratedDocument } from "mongoose"
import { Base } from "src/base/base.schema"



export type SDGDocument = HydratedDocument<SDG>
@Schema()
@ObjectType()
export class SDG  extends Base{
    @Field(() => ID, {description: 'ID of the SDG'})
    _id: string

    @Field(() => String, {description: 'Name of the SDG'})
    @Prop({required: true})
    name: string

    @Field(() => String, {description: 'Code of the SDG'})
    @Prop({required: true})
    code: string

    @Field(() => String, {description: 'Short description of the SDG'})
    @Prop({required: true})
    shortDescription:string

    @Field(() => String, {description: 'Description of the SDG', nullable: true, defaultValue: ''})
    @Prop({required: false, nullable: true, default: ''})
    description?: string

    @Field(()=> [String], {description: 'Pictures related to the SDG', nullable: true, defaultValue: []})
    @Prop({required: false, nullable: true, default: []})
    pictures?: string[]
}

export const SDGSchema = SchemaFactory.createForClass(SDG);