import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export interface userField {
    username: string,
    password: string,
    name: string,
    email: string,
    location: string,
    token: string
}

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User implements userField {

    @Prop({ type: String, required: true, trim: true, maxlength: 30 })
    username: string

    @Prop({ type: String, required: true, trim: true, maxlength: 30 })
    password: string

    @Prop({ type: String, required: true, trim: true, maxlength: 30 })
    name : string

    @Prop({ type: String, required: true, trim: true, maxlength: 100 })
    email: string

    @Prop({ type: String, trim: true, maxlength: 30 })
    location: string

    @Prop({ type: String, trim: true })
    token: string
}

export const UserSchema = SchemaFactory.createForClass(User);