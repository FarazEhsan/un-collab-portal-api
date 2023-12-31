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
  _id: string;

  @Field(() => String, { description: 'Name of the User' })
  @Prop({required: true})
  name: string;

  
  @Field(() => String, { description: 'Username for the portal' })
  @Prop({required: true, unique: true})
  userName: string;

  @Field(() => String, { description: 'User Email' })
  @Prop({required: true})
  email: string;

  @Field(() => String, { description: 'Contact number of the user', nullable: true, defaultValue: '' })
  @Prop({required: false, default: ''})
  contactNumber: string;

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
