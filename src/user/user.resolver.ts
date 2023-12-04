import { Resolver, Query, Mutation, Args, Int, ResolveField, Parent } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './schemas/user.schema';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { SkillService } from './services/skill.service';
import { Skill } from './schemas/skill.schema';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService, private readonly skillService: SkillService) {}
  @Mutation(() => User)
  async createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return await this.userService.create(createUserInput);
  }

  @Query(() => [User], { name: 'allusers' })
  findAll() {
    return this.userService.findAll();
  }

  @Query(() => User, { name: 'user' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.userService.findOne(id);
  }

  @Mutation(() => User)
  updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
    return this.userService.update(updateUserInput.id, updateUserInput);
  }

  @Mutation(() => User)
  removeUser(@Args('id', { type: () => Int }) id: number) {
    return this.userService.remove(id);
  }

  @ResolveField('skills', returns => [Skill])
  async getSkills(@Parent() user: User) {
    return this.skillService.findManyByIds(user.skills);
  }
}
