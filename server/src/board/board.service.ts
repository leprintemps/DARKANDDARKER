import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { NotFoundException } from '@nestjs/common/exceptions';
import { Model } from 'mongoose';
import { CreatePostDto, UpdatePostDto } from './dto/post.dto';
import { Post, PostDocument } from '../schema/post.schema';

@Injectable()
export class PostService {
    constructor(@InjectModel(Post.name) private postModel: Model<PostDocument>) {}
    
    async getAll(): Promise<Post[]> {
        return await this.postModel.find().exec();
    }
    
    search(title: string): Promise<Post[]> {
        throw new Error('Method not implemented.');
    }
    async getOne(id:string): Promise<Post> {
        const post = await this.postModel.findOne({ _id: id }).exec();
        if(!post){
            throw new NotFoundException(`Post ID : ${id} not found.`);
        }
        return post;
    }
    async deleteOne(id:string){
        const post = await this.postModel.exists({_id:id}).exec();
        if(!post){
            throw new NotFoundException(`Post ID : ${id} not found.`);
        }
        const deletedPost = await this.postModel
            .findByIdAndRemove({ _id: id })
            .exec();
        return deletedPost;
    }
    async create(postData: CreatePostDto): Promise<Post> {
        const createdPost = await this.postModel.create(postData);
        return createdPost;
    }

    async update(id:string, updateData: UpdatePostDto): Promise<Post> {
        const post = await this.postModel.exists({ _id: id }).exec();
        if(!post){
            throw new NotFoundException(`Post ID : ${id} not found.`);
        }
        const updatePost = await this.postModel.findByIdAndUpdate(id, updateData);
        return updatePost;

    }
}
