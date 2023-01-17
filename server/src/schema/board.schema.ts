import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Post } from './post.schema';

export type BoardDocument = HydratedDocument<Board>;

@Schema({ timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" } })
export class Board {
  
  @Prop({ type: String, required: true, maxlength: 30 })
  title: string;

  @Prop({ type: String, required: true, maxlength: 30 })
  description: string;
  
  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }] })
  posts: Post[];

  @Prop({ type: mongoose.Schema.Types.Date })
  createdAt: Date;

  @Prop({ type: mongoose.Schema.Types.Date })
  updatedAt: Date;

  @Prop({ default: null, type: mongoose.Schema.Types.Date })
  deletedAt: Date;

}

export const BoardSchema = SchemaFactory.createForClass(Board);