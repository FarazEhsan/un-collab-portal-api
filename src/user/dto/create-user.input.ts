import { InputType, Int, Field, ID } from '@nestjs/graphql';
import { Project } from '../schemas/project.schema';
import { Types } from 'mongoose';





@InputType()
export class CreateUserInput {
  @Field(() => String, { description: 'Name of the User' })
  name: string;

  @Field(() => String, { description: 'Username for the portal' })
  userName: string;

  @Field(() => String, { description: 'User Email' })
  email: string;

  @Field(()=> String, {description:'DoB of the user'})
  dob:string

  @Field(() => String, { description: 'Contact number of the user', nullable: true })
  contactNumber: string;

  @Field(() => String , {description:'Facebook link', nullable:true, defaultValue:''})
  facebook:string

  @Field(() => String , {description:'instagram link', nullable:true, defaultValue:''})
  instagram:string

  @Field(() => String , {description:'twitter link', nullable:true, defaultValue:''})
  twitter:string

  @Field(() => String , {description:'tiktok link', nullable:true, defaultValue:''})
  tiktok:string

  @Field(() => String , {description:'linkedin link', nullable:true, defaultValue:''})
  linkedin:string

  @Field(() => String, {description: 'City of the user', nullable: true})
  city: string;

  @Field(() => String, {description: 'Country of the user', nullable: true})
  country: string;

  @Field(()=> [ID], {description: 'Skills of the user', nullable: true})
  skills?:  string[]

  @Field(()=> [ID], {description: 'Groups of the user', nullable: true})
  groups?:string[]
}
