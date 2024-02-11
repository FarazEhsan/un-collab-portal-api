import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class ReactionCount {
  @Field()
  UPVOTE: number; 

  @Field()
  DOWNVOTE: number; 
}