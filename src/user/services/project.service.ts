import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Project } from '../schemas/project.schema';
import { Model } from 'mongoose';

import { CreateProjectInput } from '../dto/create-project.input';

@Injectable()
export class ProjectService {
    constructor(@InjectModel(Project.name) private projectModel: Model<Project>){}


    async createProject(createProjectInput: CreateProjectInput){
        const newProject = new this.projectModel(createProjectInput);
        await newProject.save();
        return this.projectModel.findById(newProject._id).exec();

    }

    async findAll(){
        return await this.projectModel.find().exec();
    }
    
    async findOne(id: string) {
        return await this.projectModel.findById(id).exec();
    }

    async findAllByUser(user: any) {
    
        return await this.projectModel.find({user: user}).exec();
    }
}
