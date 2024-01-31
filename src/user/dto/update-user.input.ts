import { Types } from 'mongoose';
import { CreateUserInput } from './create-user.input';
import { InputType, Field, Int, PartialType, ID } from '@nestjs/graphql';

@InputType()
export class UpdateUserInput  {
  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => String, { description: 'First Name of the user' , nullable:true})
  firstName: string;

  @Field(() => String, { description: 'Last name of the user', nullable:true })
  lastName: string;

  @Field(() => String, { nullable: true })
  userName?: string;

  @Field(() => String, { nullable: true })
  email?: string;

  @Field(() => String, { description: 'User Picture' , nullable:true})
  picture: string;

  @Field(()=> String, {nullable:true})
  dob:string

  @Field(() => String, { nullable: true })
  contactNumber?: string;

  @Field(() => String , {description:'Facebook link', nullable:true})
  facebook:string

  @Field(() => String , {description:'instagram link', nullable:true})
  instagram:string

  @Field(() => String , {description:'twitter link', nullable:true})
  twitter:string

  @Field(() => String , {description:'tiktok link', nullable:true})
  tiktok:string

  @Field(() => String , {description:'linkedin link', nullable:true})
  linkedin:string

  @Field(() => String, { nullable: true })
  city?: string;

  @Field(() => String, { nullable: true })
  country?: string;

  @Field(() => [ID], { nullable: true })
  skills?: string[];

  @Field(()=> [ID], {description: 'Groups of the user', nullable: true})
  groups?: string[];
}
