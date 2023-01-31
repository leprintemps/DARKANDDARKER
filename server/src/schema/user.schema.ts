import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Blog } from './blog.schema';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: { createdAt: "createdAt" } })
export class User {

    @Prop({ type: String, required: true, trim: true, maxlength: 30, unique: true })
    username: string

    @Prop({ type: String, required: true, trim: true, maxlength: 100 })
    password: string

    @Prop({ type: String, required: true, trim: true, maxlength: 30 })
    name : string

    @Prop({ type: String, required: true, trim: true, maxlength: 100, unique: true })
    email: string

    @Prop({ type: String, trim: true, maxlength: 30 })
    location: string

    @Prop({ type: Boolean, default: false })
    isVerify: boolean

    @Prop({ type: String })
    verifyToken: String

    @Prop({ type: String, trim: true })
    hashedRt: string
    
    @Prop({ type: mongoose.Schema.Types.Date })
    createdAt: Date;

    @Prop({type: [{ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Blog' }]})
    blogs: Blog[];
}

export const UserSchema = SchemaFactory.createForClass(User);