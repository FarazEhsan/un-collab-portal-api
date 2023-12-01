import { Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User, UserDocument } from './schemas/user.schema';
import mongoose, { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';


@Injectable()
//getting the follwoing error when I try to inject the model into the service,  ERROR [ExceptionHandler] Nest can't resolve dependencies of the UserService (?). Please make sure that the argument "UserModel" at index [0] is available in the UserModule context.
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}
  async create (createUserInput: CreateUserInput) {
    console.log(createUserInput)
    const newUser = new this.userModel(createUserInput);
    await newUser.save();
    return this.userModel.findById(newUser._id).exec();
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserInput: UpdateUserInput) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
