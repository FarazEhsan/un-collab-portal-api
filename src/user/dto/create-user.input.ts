import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateUserInput {
  @Field(() => String, { description: 'Name of the user' })
  name: number;
  @Field(() => String, { description: 'user name for the portal, its unique' })
  userName: string;
  @Field(() => String, { description: 'email of the user' })
  email: string;
}
