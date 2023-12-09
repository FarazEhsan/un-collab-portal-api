import { Args, Query, Resolver } from '@nestjs/graphql';
import { Topic } from 'src/forum/schemas/topic.schema';
import { TopicService } from '../topic.service';
import { type } from 'os';

@Resolver(() => Topic)
export class TopicResolver {

    constructor(private readonly topicService:TopicService){}

    @Query(() => [Topic], {name: 'alltopics'})
    findAll(){
        return this.topicService.findAll();
    }   

    @Query(() => Topic, {name: 'topic'})
    find(@Args('id', {type: ()=> String}) id: string){
        return this.topicService.findOne(id);
    }
}
