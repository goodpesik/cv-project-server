
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Item, ItemSchema } from './item.schema';
import mongoose, { HydratedDocument, Types } from 'mongoose';

export type CVDataDocument = HydratedDocument<CVData>;

@Schema()
export class CVData {
  @Prop({ required: true })
  id: string; 

  @Prop({ type: ItemSchema, default: {} })
  items: Item;

  @Prop()
  name: string;

  @Prop()
  imageName: string;

  @Prop()
  imageUrl: string;

  @Prop({
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'User',
    default: null,
  })
  createdBy: Types.ObjectId[];
}

export const CVDataSchema = SchemaFactory.createForClass(CVData);