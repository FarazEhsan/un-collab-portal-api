import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './schemas/user.schema';
import { SkillResolver } from './resolvers/skill.resolver';
import { SkillService } from './services/skill.service';
import { SkillSchema } from './schemas/skill.schema';
import { SDGResolver } from './resolvers/sdg.resolver';
import { SDGService } from './services/sdg.service';
import { SDGSchema } from './schemas/sdg.schema';


//I have the mongoese schema in the user module and also the resolver and service and ObjectType for the graphql, how do I import the schema into the app module or this module??
@Module({
  imports:[MongooseModule.forFeature([{name: 'User', schema: UserSchema}, {name: 'Skill', schema: SkillSchema}, {name: 'SDG', schema: SDGSchema}])],
  providers: [UserResolver, UserService, SkillResolver, SkillService, SDGResolver, SDGService],
  exports: [UserService]
})
export class UserModule {}
