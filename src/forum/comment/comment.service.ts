import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CommentDocument, Comment } from '../schemas/comment.schema';
import { Model } from 'mongoose';
import { CreateCommentDTO } from './dto/create-comment-dto';
import { ReactionService } from '../reaction/reaction.service';

@Injectable()
export class CommentService {
    constructor(@InjectModel(Comment.name) private commentModel: Model<CommentDocument>, private readonly reactionService:ReactionService) { }
    async create(createCommentDto: CreateCommentDTO) {

        const newComment= new this.commentModel(createCommentDto);
        await newComment.save();
        return  this.commentModel.find({_id:newComment.id}).populate('author', 'userName').exec();
 
    }
    
    findAll() {
        return this.commentModel.find().exec();
    }

    findAllByTopic(topic: any, limit: number, skip: number) {
        console.log('topic in comment service', topic);
        return this.commentModel.find(topic).limit(limit).skip(skip).exec();
    }

    countAllByTopic(topic: any) {
        console.log('topic in comment service', topic);
        return this.commentModel.countDocuments(topic).exec();
    }
    
    findOne(id: string) {
        return this.commentModel.findById(id).exec();
    }
    
    update(id: number, updateCommentDto: any) {
        return `This action updates a #${id} comment`;
    }
    
    async remove(id: string) {
        //will remove reactions with the comment
        await this.reactionService.removeByComment(id.toString());
        return await this.commentModel.findByIdAndDelete(id).exec();
    }
}
