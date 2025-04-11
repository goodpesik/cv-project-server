
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Item, ItemSchema } from './item.schema';
import mongoose, { HydratedDocument, Types } from 'mongoose';

export type CVDataDocument = HydratedDocument<CVData>;

@Schema({ _id: false }) 
export class CVSettings {
  @Prop() bgColor: string;
  @Prop() textColor: string;
  @Prop() headingsColor: string;
  @Prop() font: string;
  @Prop() textSize: number;
}

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

  @Prop()
  firstName: string;

  @Prop()
  lastName: string;

  @Prop({
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'User',
    default: null,
  })
  createdBy: Types.ObjectId[];

  @Prop({ type: Object }) settings?: CVSettings;
}

export const CVDataSchema = SchemaFactory.createForClass(CVData);