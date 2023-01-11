import { Blog } from './blog.schema';
import { User } from './user.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export interface managerField {

  user: User,
  isEditable: boolean,

}

export type ManagerDocument = HydratedDocument<Manager>;

@Schema({ timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" } })
export class Manager implements managerField{

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Blog", required: true })
  blog: Blog;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "User", required: true })
  user: User;

  @Prop({ type: Boolean, default: false })
  isEditable: boolean;

}

export const ManagerSchema = SchemaFactory.createForClass(Manager);