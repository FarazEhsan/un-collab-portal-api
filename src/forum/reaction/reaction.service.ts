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
        return this.reactionModel.find({topic:_id, comment:null}).populate('user').exec();
    }

    remove(id: string) {
        return this.reactionModel.findByIdAndDelete(id).exec();
    }
    async removeByUserAndTopic(user: string, topic: string) {
        return await this.reactionModel.findOneAndDelete({user, topic}).exec();
    }

    async removeByUserAndComment(user: string, comment: string) {
        console.log('user and comment in reaction service', user, comment)
        return await this.reactionModel.findOneAndDelete({user, comment}).exec();
    }

    async removeByComment(comment: string) {
        return await this.reactionModel.deleteMany({comment }).exec();
    }
    async findOneByUserAndTopic(user: string, topic: string) {
        return await this.reactionModel.findOne({user, topic, comment: null}).exec();
    }
    async findOneByUserAndComment(user: string, comment: string) {
        return await this.reactionModel.findOne ({user, comment}).exec();
    }

    async findTotalCommentUpvotesAndDownvotes(comment: string) {
        const results = await this.reactionModel.aggregate([
            {
                $match: {comment}
            },
            {
                $group: {
                    _id: '$type',
                    count: {$sum: 1}
                }
            }
        ]).exec();

             // Initialize an object with all reaction types set to 0
             const reactionCounts = {
                UPVOTE: 0,
                DOWNVOTE: 0,
            };
        
            // Update the counts for the reaction types that were found
            for (const result of results) {
                reactionCounts[result._id] = result.count;
            }
        
            return reactionCounts;
    }

    async findTotalTopicUpvotesAndDownvotes(topic: string) {
        const results = await this.reactionModel.aggregate([
            {
                $match: {
                    topic,
                    comment: null // match reactions where comment is null
                }
            },
            {
                $group: {
                    _id: '$type',
                    count: { $sum: 1 }
                }
            }
        ]).exec();
    

        // Initialize an object with all reaction types set to 0
        const reactionCounts = {
            UPVOTE: 0,
            DOWNVOTE: 0,
        };
    
        // Update the counts for the reaction types that were found
        for (const result of results) {
            reactionCounts[result._id] = result.count;
        }
    
        return reactionCounts;
    }
}
