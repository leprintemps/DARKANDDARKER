import { Blog } from './blog.schema';
import { User } from './user.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export interface managerField {

  user: User,
  isEditable: boolean,
  createdAt: Date,
  updatedAt: Date,
  deletedAt: Date,

}

export type ManagerDocument = HydratedDocument<Manager>;

@Schema({ timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" } })
export class Manager implements managerField{

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "User", required: true })
  user: User;

  @Prop({ type: Boolean, default: false })
  isEditable: boolean;

  @Prop({ default: new Date(), type: mongoose.Schema.Types.Date })
  createdAt: Date;

  @Prop({ default: new Date(), type: mongoose.Schema.Types.Date })
  updatedAt: Date;

  @Prop({ default: null, type: mongoose.Schema.Types.Date })
  deletedAt: Date;

}

export const ManagerSchema = SchemaFactory.createForClass(Manager);