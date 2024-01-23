import { Field, ID, InputType } from "@nestjs/graphql";
import { ReactionType } from "src/enum";

//getting this error: Error: Cannot determine a GraphQL input type null for the "type". Make sure your class is decorated with an appropriate decorator.
@InputType()
export class CreateReactionDTO {
    @Field(() => ReactionType, { description: 'Type of the reaction enum: [UPVOTE, DOWNVOTE]' })
    type: ReactionType;
    @Field(() => ID, { description: 'User of the reaction' })
    user: string;
    @Field(() => ID, { description: 'Comment of the reaction', nullable: true })
    comment?: string;
    @Field(() => ID, { description: 'Topic of the reaction', nullable: true })
    topic?: string;
}