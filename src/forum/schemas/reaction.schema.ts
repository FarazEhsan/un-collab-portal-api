import { Prop } from "@nestjs/mongoose"
import { Types } from "mongoose"

export class Reaction {
    
    @Prop({required: true, enum: ['like', 'dislike']})
    type:string

    @Prop({required: true, type: Types.ObjectId, ref: 'User'})
    user:string
}