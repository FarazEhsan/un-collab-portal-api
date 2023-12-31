import { Types } from 'mongoose';
import { CreateUserInput } from './create-user.input';
import { InputType, Field, Int, PartialType, ID } from '@nestjs/graphql';

@InputType()
export class UpdateUserInput extends PartialType(CreateUserInput) {
  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => String, { nullable: true })
  userName?: string;

  @Field(() => String, { nullable: true })
  email?: string;

  @Field(() => String, { nullable: true })
  contactNumber?: string;

  @Field(() => String, { nullable: true })
  city?: string;

  @Field(() => String, { nullable: true })
  country?: string;

  @Field(() => [ID], { nullable: true })
  skills?: string[];

  @Field(()=> [ID], {description: 'Groups of the user', nullable: true})
  groups?: string[];
}
