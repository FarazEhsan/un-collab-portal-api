import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Group } from '../schemas/group.schema';
import { Model } from 'mongoose';
import { CreateGroupInput } from '../dto/create-group.input';

@Injectable()
export class GroupService {

    constructor(@InjectModel(Group.name)  private groupModel: Model<Group>){}

    async createGroup(createGroupInput:CreateGroupInput){
        const newGroup = new this.groupModel(createGroupInput);
        await newGroup.save();
        return this.groupModel.findById(newGroup._id).exec();
    }

    async findManyByIds(ids: string[]) {
        return await this.groupModel.find({
            _id: {
                $in: ids
            }
        }).exec();
    }


    async findAll(){
        return await this.groupModel.find().exec();
    }
}
