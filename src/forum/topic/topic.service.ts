import { Injectable } from '@nestjs/common';
import { CreateTopicDto } from './dto/create-topic-dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Topic, TopicDocument } from '../schemas/topic.schema';

@Injectable()
export class TopicService {
    constructor(@InjectModel(Topic.name) private topicModel:Model<TopicDocument>){}
    async create (createTopicDTO: CreateTopicDto) {
        const newTopic = new this.topicModel(createTopicDTO)
        await newTopic.save();
        return this.topicModel.findById(newTopic._id).exec();
    }

    findAll() {
        return this.topicModel.find().sort({ createdAt: -1 }).exec();
    }

    findOne(id: string) {
        return this.topicModel.findById(id).exec();
    }
}
 