
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';


export type ItemDocument = HydratedDocument<Item>;

export enum ItemTypes {
    Contacts,
    Skills,
    Education,
    Hobby,
    Languages,
    Position,
    Experience,
    Summary
}

export enum ContactType {
    Email = "Email",
    Phone = "Phone",
    Text = "Text",
    Link = "Link",
    Instagram = "Instagram",
    Facebook = "Facebook",
    LinkedIn = "LinkedIn",
    GitHub = "GitHub",
    Twitter = "Twitter",
    YouTube = "YouTube",
    TikTok = "TikTok",
  }
  
@Schema({ _id: false }) 
export class ContactModel {
    @Prop({ enum: ContactType }) type: ContactType;
    @Prop() value?: string;
    @Prop() link?: string;
}

@Schema({ _id: false }) 
export class EducationModel {
    @Prop() school: string;
    @Prop() faculty: string;
    @Prop() degree: string;
    @Prop() year: string;
    @Prop() city: string;
    @Prop() country: string;
}

@Schema({ _id: false }) 
export class ExperienceModel {
    @Prop() company: string;
    @Prop() startDate: string;
    @Prop() endDate: string;
    @Prop() city: string;
    @Prop() country: string;
    @Prop() role: string;
    @Prop() description: string;
    @Prop() descriptionList: string[];
}

@Schema({ _id: false }) 
export class HobbyModel {
    @Prop() iconId: string;
}

@Schema({ _id: false }) 
export class SkillModel {
    @Prop() name: string;
    @Prop() level: number;
}
  
  
  @Schema({ _id: false })
  export class Item {
    @Prop() photo: string;
  
    @Prop({ enum: ItemTypes })
    type: ItemTypes;
  
    @Prop({ type: [Object] }) contacts?: ContactModel[];
  
    @Prop({ type: [Object] }) skills?: SkillModel[];

    @Prop({ type: [Object] }) languages?: SkillModel[];
  
    @Prop({ type: [Object] }) education?: EducationModel[];
  
    @Prop({ type: [Object] }) hobby?: HobbyModel[];
  
    @Prop() positionDescription?: string;
  
    @Prop() summaryDescription?: string;
  
    @Prop({ type: [Object] }) experience?: ExperienceModel[];
  }
  
  export const ItemSchema = SchemaFactory.createForClass(Item);
