import { Field, ObjectType } from "@nestjs/graphql";
import { Prop, Schema } from "@nestjs/mongoose";

@Schema()
@ObjectType()
export class Base {
 
    @Field(() => Number, {description:'Operation performed on the document, 0 for create, 1 for update, 2 for delete'})
    @Prop({type: Number, enum: [0, 1, 2], default:0})
    updOperation:number;
    @Field(() => Date, {description:'Time of creation of the document'})
    @Prop({type: Date, default: Date.now})
    createdAt: Date;
    @Field(() => Date, {description:'Time of updation of the document'})
    @Prop({type: Date, default: Date.now})
    updatedAt: Date;
    
}