import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export interface blogField {
  isPublic: boolean,
  name: string,
  description: string,
  managers: Manager[],
  createdAt: Date,
  updatedAt: Date,
  deletedAt: Date,
}

export type BlogDocument = HydratedDocument<Blog>;

@Schema({ timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" } })
export class Blog implements blogField{

  
  @Prop({ type: Boolean, required: true }) 
  isPublic: boolean;
  
  @Prop({ type: String, required: true, trim: true, maxLength: 30 }) 
  name: string;
  
  @Prop({ type: String, required: true, trim: true, maxLength: 30 }) 
  description: string;
  
  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Manager' })
  managers: Manager[];
  
  @Prop({ default: new Date(), type: mongoose.Schema.Types.Date })
  createdAt: Date;

  @Prop({ default: new Date(), type: mongoose.Schema.Types.Date })
  updatedAt: Date;

  @Prop({ default: null, type: mongoose.Schema.Types.Date })
  deletedAt: Date;
 
}

export const BlogSchema = SchemaFactory.createForClass(Blog);