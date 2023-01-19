import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { object } from 'joi';
import mongoose, { HydratedDocument, ObjectId } from 'mongoose';
import { Board } from './board.schema';
import { Manager } from './manager.schema';
import { User } from './user.schema';

export type BlogDocument = HydratedDocument<Blog>;

@Schema({ timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" } })
export class Blog {

  @Prop({ type: Boolean, required: true }) 
  isPublic: boolean;
  
  @Prop({ type: String, required: true, trim: true, maxLength: 30 }) 
  name: string;
  
  @Prop({ type: String, required: true, trim: true, maxLength: 30 }) 
  description: string;
  
  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  owner: User;

  @Prop({type:[{ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Board' }]})
  boards: Board[];

  @Prop({ type: Object })
  managers: { 
    userId: ObjectId;
    isEditable: boolean;
    createAt: Date;
    updateAt: Date;
    deleteAt: Date;
  }
    
  @Prop({ type: mongoose.Schema.Types.Date })
  createdAt: Date;

  @Prop({ type: mongoose.Schema.Types.Date })
  updatedAt: Date;

  @Prop({ default: null, type: mongoose.Schema.Types.Date })
  deletedAt: Date;
 
}

export const BlogSchema = SchemaFactory.createForClass(Blog);