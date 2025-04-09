import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, UpdateWriteOpResult } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import { User } from './schemas/users.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(user: User): Promise<User> {
    const createdItem = new this.userModel({
      id: uuidv4(),
      uiid: user.id,
      name: user.name,
    });
    return createdItem.save();
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  findOne(id: string): Promise<User[]>  {
    return this.userModel.find({ uiid: id }).exec();
  }

  update(id: string, user: User) {
    return this.userModel.updateOne({ id }, { $set: user }).exec();
  }


  remove(id: string) {
    return this.userModel.deleteOne({ id }).exec();
  }
}
