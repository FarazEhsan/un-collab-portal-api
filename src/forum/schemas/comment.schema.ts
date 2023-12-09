import { Prop, Schema } from "@nestjs/mongoose";
import { Types } from "mongoose";
import { Base } from "src/base/base.schema";
import { Reaction } from "./reaction.schema";

@Schema()
export class Comment extends Base {

    @Prop({required: true, length:1000})
    text:string

    @Prop({required: true, type: Types.ObjectId, ref: 'User'})
    author: string

    @Prop({required: true, type: Types.ObjectId, ref: 'Topic'})
    parentComment?: string
    
    @Prop({type: [{ type: Types.ObjectId, ref: 'Reaction' }], default: []})
    reactions?: Reaction[]

}