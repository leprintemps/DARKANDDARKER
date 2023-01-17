import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { NotFoundException } from '@nestjs/common/exceptions';
import { Model } from 'mongoose';
import { CreatePostDto, FindPostDto, UpdatePostDto } from '../../dto/post.dto';
import { Post, PostDocument } from '../../schema/post.schema';

@Injectable()
export class PostService {
    constructor(@InjectModel(Post.name) private postModel: Model<PostDocument>) {}
    
    
    async selectPostList(post: FindPostDto): Promise<Post[]> {
        const { page, limit, sort, title, body, author } = post;
        
        const skip = (page - 1) * limit;
        const query = {};
        if (title) {
            query['title'] = { $regex: title, $options: 'i' };
        }
        if (body) {
            query['body'] = { $regex: body, $options: 'i' };
        }
        if (author) {
            query['author'] = { $regex: author, $options: 'i' };
        }
        const postList = await this.postModel
            .find(query)
            .sort(sort)
            .skip(skip)
            .limit(limit)
            .exec();
        return postList;

    }
    async selectPostDetail(id:string): Promise<Post> {
        const post = await this.postModel.findOne({ _id: id }).exec();
        if(!post){
            throw new NotFoundException(`Post ID : ${id} not found.`);
        }
        return post;
    }
    async insertPost(postData: CreatePostDto): Promise<Post> {
        const createdPost = await this.postModel.create(postData);
        return createdPost;
    }
    async deletePost(id:string){
        const post = await this.postModel.exists({_id:id}).exec();
        if(!post){
            throw new NotFoundException(`Post ID : ${id} not found.`);
        }
        const deletedPost = await this.postModel
            .findByIdAndRemove({ _id: id })
            .exec();
        return deletedPost;
    }

    async updatePost(id:string, updateData: UpdatePostDto): Promise<Post> {
        const post = await this.postModel.exists({ _id: id }).exec();
        if(!post){
            throw new NotFoundException(`Post ID : ${id} not found.`);
        }
        const updatePost = await this.postModel.findByIdAndUpdate(id, updateData);
        return updatePost;

    }
}
