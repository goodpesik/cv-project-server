
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, Types } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
    @Prop({ required: true })
    id: string;
    @Prop()
    uiid: string;
    @Prop()
    name: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
