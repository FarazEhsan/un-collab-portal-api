import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';



export type SkillDocument = HydratedDocument<Skill>
@Schema()
@ObjectType()
export class Skill {
    @Field(() => ID)
    _id: string;
    @Field(() => String, {description:'Name of the skill'})
    @Prop({required: true})
    name: string;

    @Field(() => String, {description:'Level of the skill'})
    @Prop({required:true, enum: ['Beginner', 'Intermediate', 'Expert']})
    level: string
}

export const SkillSchema = SchemaFactory.createForClass(Skill);
