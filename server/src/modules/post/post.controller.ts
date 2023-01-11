import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query } from '@nestjs/common';
import { Public } from 'src/common/decorators';
import { PostService } from './post.service';
import { CreatePostDto, UpdatePostDto } from '../../dto/post.dto';
import { Post as Posts } from '../../schema/post.schema';

/***
 * Controller
 * express의 라우터 같은 존재
 * url가져오고 함수 실행
 */

@Controller('post')
export class PostController {

    constructor(private readonly postService: PostService){}
    
    @Public()
    @Get()
    async getAll(): Promise<Posts[]>{
        const Posts = this.postService.getAll();
        return Posts;
    }

    @Public()
    @Get("Search")
    async search(@Query("title") title: string ){
        return `post search : ${title}`
    }

    @Public()
    @Get("/:id")
    async etOne(@Param('id') id: string): Promise<Posts> {
        return this.postService.getOne(id);
    }

    @Public()
    @Post()
    async create(@Body() postData: CreatePostDto): Promise<Posts>{
        return this.postService.create(postData);
    }
    
    @Public()
    @Delete("/:id")
    async remove(@Param('id') postId: string) {
        return this.postService.deleteOne(postId); 
    }

    @Public()
    @Put('/:id')
    async put(@Param('id') postId: string) {
        return `put post : ${postId}`; 
    }


    @Public()
    @Patch('/:id')
    async patch(@Param('id') postId: string, @Body() updateData: UpdatePostDto): Promise<Posts> {
        return this.postService.update(postId, updateData);
        
    }
    
    
}
