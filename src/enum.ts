import { registerEnumType } from "@nestjs/graphql";

export enum ReactionType {
    Like = "UPVOTE",
    Dislike = "DOWNVOTE",
}


registerEnumType(ReactionType, {
    name: 'ReactionType', // this one is required
    description: 'The basic reactions', // this one is optional
  });