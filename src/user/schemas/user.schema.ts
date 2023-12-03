import { ObjectType, Field } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, Types } from 'mongoose';
import { Skill } from './skill.schema';


export type UserDocument = HydratedDocument<User>
@ObjectType()
@Schema()
//Skill should be a seperate collection in mongoDB as I aslo need to query the skills and also the users with the skills
export class User {
  @Field(() => String, { description: 'Name of the User' })
  @Prop({required: true})
  name: string;

  
  @Field(() => String, { description: 'Username for the portal' })
  @Prop({required: true, unique: true})
  userName: string;

  @Field(() => String, { description: 'User Email' })
  @Prop({required: true})
  email: string;

  @Field(() => String, { description: 'Contact number of the user' })
  @Prop({required: false})
  contactNumber: string;

  @Field(()=> [Skill], {description: 'Skills of the user', nullable: true})
  @Prop({required:false, type:Types.ObjectId, ref: 'Skill'})
  skills: Types.ObjectId[]

}

export const UserSchema = SchemaFactory.createForClass(User);
