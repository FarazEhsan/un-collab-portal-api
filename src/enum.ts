import { registerEnumType } from "@nestjs/graphql";

export enum ReactionType {
    Like = "LIKE",
    Dislike = "DISLIKE",
}


registerEnumType(ReactionType, {
    name: 'ReactionType', // this one is mandatory
    description: 'The basic reactions', // this one is optional
  });