import { Args, Mutation, Parent, ResolveField, Resolver, Query } from '@nestjs/graphql';
import { ProjectService } from '../services/project.service';
import { Project } from '../schemas/project.schema';
import { CreateProjectInput } from '../dto/create-project.input';
import { SDGService } from '../services/sdg.service';
import { SDG } from '../schemas/sdg.schema';
import { UpdateProjectInput } from '../dto/update-project.input';


@Resolver(() => Project)
export class ProjectResolver {
    constructor(private readonly projectService:ProjectService, private readonly sdgService:SDGService) {}
    
    @Mutation(() => Project)
    createProject(@Args('createProjectInput') createProjectInput:CreateProjectInput){
        return this.projectService.createProject(createProjectInput);
    }

    @Mutation(() => Project)
    updateProject(@Args('id', {type: () => String}) id:string, @Args('updateProjectInput') updateProjectInput:UpdateProjectInput){
        return this.projectService.updateProject(id, updateProjectInput);
    }
    @Query(() => [Project], {name: 'allProjects'})
    findAll(){
        return this.projectService.findAll();
    }

    @Query(() => Project, {name: 'project'})
    findOne(@Args('id', {type: () => String}) id: string){
        return this.projectService.findOne(id);
    }

    @ResolveField('relatedSDGs', returns => [SDG])
    async getRelatedSDGs(@Parent() project: Project){
        return this.sdgService.findManyByIds(project.relatedSDGs);
    }
}