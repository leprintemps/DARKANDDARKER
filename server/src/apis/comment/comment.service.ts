import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {Comment, CommentDocument } from 'src/schema/comment.schema';

@Injectable()
export class CommentService {
    
    constructor(@InjectModel(Comment.name) private commentModel: Model<CommentDocument>) {}

}
