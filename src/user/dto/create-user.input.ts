import { InputType, Int, Field } from '@nestjs/graphql';
import { CreateSkillInput } from './create-skill.input';


@InputType()
export class CreateUserInput {
  @Field(() => String, { description: 'Name of the User' })
  name: string;

  
  @Field(() => String, { description: 'Username for the portal' })
  userName: string;

  @Field(() => String, { description: 'User Email' })
  email: string;

  @Field(() => String, { description: 'Contact number of the user', nullable: true })
  contactNumber: string;

  @Field(type => [CreateSkillInput], {description: 'Skills of the user', nullable: true})
  skills: CreateSkillInput[]
}
