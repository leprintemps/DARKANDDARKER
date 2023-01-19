import { CreateBlogDto, UpdateBlogDto } from './../../dto/blog.dto';
import { Body, Controller, Get, Patch, Post } from "@nestjs/common";
import { BlogService } from "./blog.service";

@Controller("blog")
export class BlogController {

    constructor(
        private blogService: BlogService,
    ){}

    // 블로그 목록 조회
    @Get("")
    async selectBlogList(@Body() _id: string): Promise<any> {
        return this.blogService.selectBlogList(_id);
    }
    
    // 블로그 상세 조회

    // 블로그 생성
    @Post("")
    async createBlog(@Body() blogDto: CreateBlogDto): Promise<any> {
        await this.blogService.createBlog(blogDto);
    }

    // 블로그 수정

    // 블로그 삭제

}