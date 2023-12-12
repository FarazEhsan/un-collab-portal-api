import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CommentDocument, Comment } from '../schemas/comment.schema';
import { Model } from 'mongoose';
import { CreateCommentDTO } from './dto/create-comment-dto';

@Injectable()
export class CommentService {
    constructor(@InjectModel(Comment.name) private commentModel: Model<CommentDocument>) { }
    async create(createCommentDto: CreateCommentDTO) {

        const newComment= new this.commentModel(createCommentDto);
        await newComment.save();
        return  this.commentModel.find(newComment.id).exec();
 
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
    
    remove(id: number) {
        return `This action removes a #${id} comment`;
    }
}
