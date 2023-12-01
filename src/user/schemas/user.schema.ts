import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';


export type UserDocument = HydratedDocument<User>
@ObjectType()
@Schema()
export class User {
  // @Field(() => String, { description: 'User ID' })
  // @Prop()
  // _id: string;

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
  constactNumber: string;

}

export const UserSchema = SchemaFactory.createForClass(User);
