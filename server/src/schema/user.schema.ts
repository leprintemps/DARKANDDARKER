import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

//타임스탬프
@Schema()
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

    @Prop({ type: String, trim: true })
    hashedRt: string
    
    @Prop({type:{
        id: { required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Post' },
        uuid: { required: true, type: String },
    }})
    comments: Blog[];
}

export const UserSchema = SchemaFactory.createForClass(User);