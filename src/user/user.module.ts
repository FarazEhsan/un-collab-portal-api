import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './schemas/user.schema';

//I have the mongoese schema in the user module and also the resolver and service and ObjectType for the graphql, how do I import the schema into the app module or this module??
@Module({
  imports:[MongooseModule.forFeature([{name: 'User', schema: UserSchema}])],
  providers: [UserResolver, UserService],
})
export class UserModule {}
