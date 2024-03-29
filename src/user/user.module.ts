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
import { ProjectSchema } from './schemas/project.schema';
import { ProjectResolver } from './resolvers/project.resolver';
import { ProjectService } from './services/project.service';
import { GroupResolver } from './resolvers/group.resolver';
import { GroupService } from './services/group.service';
import { GroupSchema } from './schemas/group.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'User', schema: UserSchema },
      { name: 'Skill', schema: SkillSchema },
      { name: 'SDG', schema: SDGSchema },
      { name: 'Project', schema: ProjectSchema },
      { name: 'Group', schema: GroupSchema },
    ]),
  ],
  providers: [
    UserResolver,
    UserService,
    SkillResolver,
    SkillService,
    SDGResolver,
    SDGService,
    ProjectResolver,
    ProjectService,
    GroupResolver,
    GroupService,
  ],
  exports: [UserService],
})
export class UserModule {}
