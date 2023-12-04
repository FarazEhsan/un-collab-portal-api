import { Injectable } from "@nestjs/common";
import { Skill, SkillDocument } from "../schemas/skill.schema";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { CreateSkillInput } from "../dto/create-skill.input";

@Injectable()
export class SkillService{
    constructor(@InjectModel(Skill.name) private skillModel:Model<SkillDocument>){}

    async create(createSkillInput: CreateSkillInput){
        const newSkill = new this.skillModel(createSkillInput);
        await newSkill.save();
        return this.skillModel.findById(newSkill._id).exec();
    }

    async findManyByIds(ids: string[]) {
        return this.skillModel.find({_id: {$in: ids}}).exec();
      }
}