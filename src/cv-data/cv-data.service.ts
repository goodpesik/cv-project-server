import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Item } from './schemas/item.schema';
import { Model, UpdateWriteOpResult } from 'mongoose';
import { ItemModel } from './models/item.model';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class CvDataService {
  constructor(@InjectModel(Item.name) private itemModel: Model<Item>) {}

  async create(item: ItemModel): Promise<Item> {
    const createdItem = new this.itemModel({
      id: uuidv4(),
      ...item,
    });
    return createdItem.save();
  }

  async findAll(): Promise<Item[]> {
    return this.itemModel.find().exec();
  }

  findOne(id: string): Promise<Item> {
    return this.itemModel.findById(id).exec();
  }

  update(id: string, item: ItemModel) {
    return this.itemModel.updateOne({ id }, { $set: item }).exec();
  }

  remove(id: string) {
    return this.itemModel.deleteOne({ id }).exec();
  }
}
