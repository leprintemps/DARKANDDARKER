import { CreateBlogDto, UpdateBlogDto } from './../../dto/blog.dto';
import { Controller, Get, Patch, Post } from "@nestjs/common";
import { BlogService } from "./blog.service";

@Controller("blog")
export class BlogController {

    constructor(
        private blogService: BlogService,
    ){}

    // 블로그 목록 조회
    // @Get("")
    async selectBlogList(_id: string): Promise<any> {
        return this.blogService.selectBlogList(_id);
    }
    
    // 블로그 상세 조회
    // @Get("/:id")
    async selectBlogDetail(_id: string): Promise<any> {
        return this.selectBlogDetail(_id);
    }

    // 블로그 생성
    @Post("")
    async createBlog(blogDto: CreateBlogDto): Promise<any> {
        return this.createBlog(blogDto);
    }

    // 블로그 수정
    // @Patch("/:id")
    async updateBlog(blogDto: UpdateBlogDto): Promise<any> {
        return this.updateBlog(blogDto);
    }

    // 블로그 삭제
    // @Patch("/")
    async removeBlog(_id: string): Promise<any> {
        this.blogService.removeBlog(_id);
    }

}