import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import { CVData } from './schemas/cv-data.schema';

@Injectable()
export class CvDataService {
  constructor(@InjectModel(CVData.name) private CVDataModel: Model<CVData>) {}

  async create(data: CVData): Promise<CVData> {
    const createdItem = new this.CVDataModel({
      ...data,
      id: uuidv4(),
    });
    return createdItem.save();
  }

  async findAll(userId: string): Promise<CVData[]> {
    return this.CVDataModel.find({ createdBy: userId}).exec();
  }

  findOne(id: string): Promise<CVData> {
    return this.CVDataModel.findById(id).exec();
  }

  update(id: string, data: CVData) {
    return this.CVDataModel.updateOne({ _id: id }, { $set: data }).exec();
  }

  patch(id: string, data: Partial<CVData>) {
    return this.CVDataModel.findByIdAndUpdate({ _id: id }, { $set: data }).exec();
  }

  remove(id: string) {
    return this.CVDataModel.deleteOne({ _id: id }).exec();
  }
}
