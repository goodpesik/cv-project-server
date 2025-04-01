
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { ItemTypes } from '../models/item.model';
import { ContactModel } from '../models/contacts.model';
import { SkillModel } from '../models/skills.model';
import { EducationModel } from '../models/education.model';
import { ExperienceModel } from '../models/experience.model';

export type ItemDocument = HydratedDocument<Item>;

@Schema()
export class Item {
    @Prop({ required: true })
    id: string;
    @Prop()
    photo: string;
    @Prop()
    type: ItemTypes;
    @Prop({ type: [Object] })
    contacts?: ContactModel[];
    @Prop({ type: [Object] })
    skills?: SkillModel[];
    @Prop({ type: [Object] })
    education?: EducationModel[];
    @Prop({ type: [Object] })
    hobby?: string[];
    @Prop()
    positionDescription?: string;
    @Prop()
    summaryDescription?: string;
    @Prop({ type: [Object] })
    experience?: ExperienceModel[];
}

export const ItemSchema = SchemaFactory.createForClass(Item);
