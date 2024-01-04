import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { SDG } from '../schemas/sdg.schema';
import { SDGService } from '../services/sdg.service';
import { CreateSDGInput } from '../dto/create-sdg.input';


@Resolver(()=> SDG)
export class SDGResolver {

    constructor(private readonly sdgService:SDGService){}
    @Mutation(() => SDG)
    async create(@Args('createSDGInput') createSDGInput:CreateSDGInput){
       return await this.sdgService.create(createSDGInput);
    }

    @Query(() => [SDG] , {name:'allsdgs'})
    async findAll(){
        return await this.sdgService.findAll()
    }
}
