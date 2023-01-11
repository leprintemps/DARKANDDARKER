import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Post } from './post.schema';

export interface boardField {
  title: string,
  description: string,
  post: Post[],
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
  
  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }] })
  post: Post[];

  @Prop({ default: new Date(), type: mongoose.Schema.Types.Date })
  createAt: Date;

  @Prop({ default: new Date(), type: mongoose.Schema.Types.Date })
  updateAt: Date;

}

export const BoardSchema = SchemaFactory.createForClass(Board);