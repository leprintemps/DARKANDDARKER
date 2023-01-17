import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query } from '@nestjs/common';
import { Public } from 'src/common/decorators';
import { PostService } from './post.service';
import { CreatePostDto, FindPostDto, UpdatePostDto } from '../../dto/post.dto';
import { Post as Posts } from '../../schema/post.schema';

@Controller('post')
export class PostController {

    constructor(private readonly postService: PostService){}
    

    @Public()
    @Get()
    async selectPostList(@Body() post: FindPostDto ): Promise<Posts[]>{
        return this.postService.selectPostList(post);
    }

    @Public()
    @Get("/:id")
    async selectPostDetail(@Param('id') id: string): Promise<Posts> {
        return this.postService.selectPostDetail(id);
    }

    @Public()
    @Post()
    async insertPost(@Body() postData: CreatePostDto): Promise<Posts>{
        return this.postService.insertPost(postData);
    }
    
    @Public()
    @Delete("/:id")
    async deletePost(@Param('id') postId: string) {
        return this.postService.deletePost(postId); 
    }

    @Public()
    @Put('/:id')
    async put(@Param('id') postId: string) {
        return `put post : ${postId}`; 
    }


    @Public()
    @Patch('/:id')
    async updatePost(@Param('id') postId: string, @Body() updateData: UpdatePostDto): Promise<Posts> {
        return this.postService.updatePost(postId, updateData);
        
    }
    
    
}
