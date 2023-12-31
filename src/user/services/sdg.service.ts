import { Injectable } from '@nestjs/common';
import { SDG, SDGDocument } from '../schemas/sdg.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateSDGInput } from '../dto/create-sdg.input';

@Injectable()
export class SDGService {
    constructor(@InjectModel(SDG.name) private sdgModel:Model<SDGDocument>){}

    async create (createSDGInput: CreateSDGInput){
        const newSDG = new this.sdgModel(createSDGInput);
        console.log('Kia scene hai input  ka', createSDGInput)
        await newSDG.save();
        return this.sdgModel.findById(newSDG._id).exec();
    }

    async findManyByIds(ids: string[]) {
        return await this.sdgModel.find({
            _id: {
                $in: ids
            }
        }).exec();
    }
}
