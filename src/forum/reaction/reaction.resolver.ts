import { Args, Mutation, Parent, Query, ResolveField, Resolver } from "@nestjs/graphql";
import { Reaction } from "../schemas/reaction.schema";
import { ReactionService } from "./reaction.service";
import { CreateReactionDTO } from "./dto/create-reaction-dto";
import { UserService } from "src/user/user.service";
import { User } from "src/user/schemas/user.schema";


@Resolver(() => Reaction)

export class ReactionResolver {
    constructor(private reactionService: ReactionService, private readonly userService: UserService) {}
    @Mutation(() => Reaction)
    createReaction(@Args('createReactionInput') createReactionInput: CreateReactionDTO) { 
        return this.reactionService.create(createReactionInput);
    }

    @Query(() => [Reaction], {name: 'allreactions'})
    findAll(){
      return this.reactionService.findAll();
    }

    @Query(() => Reaction, {name: 'reaction'})
    findOne(@Args('id', {type: () => String}) id: string){
      return this.reactionService.findOne(id);
    }

    @ResolveField(('user'), () => User)
    async getUser(@Parent() reaction: Reaction) {
        const { user } = reaction;
        console.log('user in reaction resolver', user)
        return this.userService.findOne(user);
    }

}