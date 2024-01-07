import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Skill } from './skill.schema';
import { Base } from 'src/base/base.schema';
import { Project } from './project.schema';
import { Group } from './group.schema';



export type UserDocument = HydratedDocument<User>
@ObjectType()
@Schema()

export class User extends Base {

  @Field(() => ID)
  @Prop({ required: true })
  _id: string;

  @Field(() => String, { description: 'Name of the User' })
  @Prop({required: true})
  name: string;

  @Field(() => String, { description: 'First Name of the user' })
  @Prop({required: true})
  firstName: string;

  @Field(() => String, { description: 'Last name of the user' })
  @Prop({required: true})
  lastName: string;

  
  @Field(() => String, { description: 'Username for the portal' })
  @Prop({required: true, unique: true})
  userName: string;

  @Field(() => String, { description: 'User Email' })
  @Prop({required: true})
  email: string;

  @Field(() => String, {description: 'Date of Birth', nullable:true})
  @Prop({required:false})
  dob:string

  @Field(() => Number, {description:'Age of the user.', nullable:true})
  age:number;

  @Field(() => String, { description: 'Contact number of the user', nullable: true, defaultValue: '' })
  @Prop({required: false, default: ''})
  contactNumber: string;

  @Field(() => String , {description:'Facebook link', nullable:true, defaultValue:''})
  @Prop({required:false})
  facebook:string

  @Field(() => String , {description:'instagram link', nullable:true, defaultValue:''})
  @Prop({required:false})
  instagram:string

  @Field(() => String , {description:'twitter link', nullable:true, defaultValue:''})
  @Prop({required:false})
  twitter:string

  @Field(() => String , {description:'tiktok link', nullable:true, defaultValue:''})
  @Prop({required:false})
  tiktok:string

  @Field(() => String , {description:'linkedin link', nullable:true, defaultValue:''})
  @Prop({required:false})
  linkedin:string

  @Field(() => String, {description: 'City of the user', nullable: true})
  @Prop({required: false})
  city: string;

  @Field(() => String, {description: 'Country of the user', nullable: true})
  @Prop({required: false})
  country: string;

  @Field(() => [Skill], {description: 'Skills of the user', nullable: true})
  @Prop({type: [{ type: Types.ObjectId, ref: 'Skill' }], default: []})
  skills: string[]

  @Field(() => [Project], {description: 'Projects of the user', nullable: true})
  projects?: Project[]

  @Field(() => [Group], {description: 'Groups of the user', nullable: true})
  @Prop({type: [{ type: Types.ObjectId, ref: 'Group' }], default: []})
  groups: string[]
  
}

export const UserSchema = SchemaFactory.createForClass(User);
