import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ReactionDocument } from '../schemas/reaction.schema';
import { CreateReactionDTO } from './dto/create-reaction-dto';

@Injectable()
export class ReactionService {
    constructor (@InjectModel('Reaction') private reactionModel:Model<ReactionDocument>){}
    create(createReactionDTO: CreateReactionDTO) {      
        return this.reactionModel.create(createReactionDTO);
    }
    findAll() {
        return this.reactionModel.find().exec();
    }
    findOne(id: string) {
        return this.reactionModel.findById(id).exec();
    }

    findAllByComment(_id: string)  {
        console.log('id in reaction service', _id);
        return this.reactionModel.find({comment:_id}).exec();
    }

    findAllByTopic(_id: string)  {
        return this.reactionModel.find({topic:_id}).exec();
    }
}
