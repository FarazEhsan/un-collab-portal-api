import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Group } from '../schemas/group.schema';
import { GroupService } from '../services/group.service';
import { CreateGroupInput } from '../dto/create-group.input';

@Resolver(() => Group)
export class GroupResolver {

    constructor(private readonly groupService: GroupService) { }

    @Mutation(() => Group)
    async createGroup(@Args('createGroupInput') createGroupInput: CreateGroupInput) {
        return await this.groupService.createGroup(createGroupInput);
    }

    @Query(() => [Group], { name: 'allgroups' })
    async findAll() {
        return await this.groupService.findAll();
    }


}
