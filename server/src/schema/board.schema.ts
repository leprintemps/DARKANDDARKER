import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Post } from './post.schema';

export interface boardField {
  title: string,
  description: string,
  posts: Post[],
  createdAt: Date,
  updatedAt: Date,
  deletedAt: Date,
}

export type BoardDocument = HydratedDocument<Board>;

@Schema({ timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" } })
export class Board implements boardField{
  
  @Prop({ type: String, required: true, maxlength: 30 })
  title: string;

  @Prop({ type: String, required: true, maxlength: 30 })
  description: string;
  
  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }] })
  posts: Post[];

  @Prop({ default: new Date(), type: mongoose.Schema.Types.Date })
  createdAt: Date;

  @Prop({ default: new Date(), type: mongoose.Schema.Types.Date })
  updatedAt: Date;

  @Prop({ default: null, type: mongoose.Schema.Types.Date })
  deletedAt: Date;

}

export const BoardSchema = SchemaFactory.createForClass(Board);