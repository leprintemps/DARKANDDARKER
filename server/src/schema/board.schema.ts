import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Blog } from './blog.schema';

export interface boardField {
  title: string,
  description: string,
  posts: post[]
  createAt: Date,
  updateAt: Date,
}

export type BoardDocument = HydratedDocument<Board>;

@Schema({ timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" } })
export class Board implements boardField{
  
  @Prop({ type: String, required: true, maxlength: 30 })
  title: string;

  @Prop({ type: String, required: true, maxlength: 30 })
  description: string;
  
  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Blog' })
  blog: Blog;

  @Prop({ default: new Date(), type: mongoose.Schema.Types.Date })
  createAt: Date;

  @Prop({ default: new Date(), type: mongoose.Schema.Types.Date })
  updateAt: Date;

}

export const BoardSchema = SchemaFactory.createForClass(Board);