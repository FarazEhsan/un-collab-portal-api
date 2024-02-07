import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class ReactionCount {
  @Field()
  _id: string; // the type of the reactions

  @Field()
  count: number; // the number of reactions of this type
}