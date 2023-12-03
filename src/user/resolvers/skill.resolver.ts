import { Args, Int, Mutation, Query, Resolver } from "@nestjs/graphql";
import { Skill } from "../schemas/skill.schema";
import { CreateSkillInput } from "../dto/create-skill.input";
import { SkillService } from "../services/skill.service";

@Resolver(() => Skill)


export class SkillResolver{
    constructor(private readonly skillService: SkillService){}

    @Mutation(() => Skill)
    async createSkill(@Args('createSkillInput') createSkillInput: CreateSkillInput){
        return await this.skillService.create(createSkillInput);
    }

    @Query(() => [Skill], {name: 'allskills'})
    findAll(){
       // return this.skillService.findAll();
    }

    @Query(() => Skill, {name: 'skill'})
    findOne(@Args('id', {type: () => Int}) id: number){
        //return this.skillService.findOne(id);
    }

    // @Mutation(() => Skill)
    // updateSkill(@Args('updateSkillInput') updateSkillInput: UpdateSkillInput){
    //    // return this.skillService.update(updateSkillInput.id, updateSkillInput);
    // }

    @Mutation(() => Skill)
    removeSkill(@Args('id', {type: () => Int}) id: number){
       // return this.skillService.remove(id);
    }
}