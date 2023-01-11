import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Comment } from './comment.schema';

export interface postField {
  title: string,
  author: string,
  body: string,
  comments: Comment[],
  createdAt: Date,
  updatedAt: Date,
  deletedAt: Date,
}

export type PostDocument = HydratedDocument<Post>;

@Schema({ timestamps: { createdAt: "createdAt", updatedAt: "updatedAt",  } })
export class Post implements postField{

  @Prop({ type: String, required: true, trim: true, maxLength: 30 }) 
  title: string; 
  
  @Prop({ type: String, required: true, trim: true })
  author: string;
  
  @Prop({ type: String, required: true })
  body: string;
  
  @Prop({type:[{ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }]})
  comments: Comment[];
  
  @Prop({ default: new Date(), type: mongoose.Schema.Types.Date })
  createdAt: Date;

  @Prop({ default: new Date(), type: mongoose.Schema.Types.Date })
  updatedAt: Date;

  @Prop({ default: null, type: mongoose.Schema.Types.Date })
  deletedAt: Date;
 
}

export const PostSchema = SchemaFactory.createForClass(Post);