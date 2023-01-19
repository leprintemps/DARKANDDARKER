import { CreateManagerDto } from './../../dto/manager.dto';
import { ManagerService } from './../manager/manager.service';
import { CreateBlogDto, UpdateBlogDto } from './../../dto/blog.dto';
import { HttpException } from '@nestjs/common/exceptions';
import { Blog, BlogDocument } from './../../schema/blog.schema';
import { HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from 'mongoose';

@Injectable()
export class BlogService {

    constructor(
        @InjectModel(Blog.name) 
        private blogModel: Model<BlogDocument>,
        private managerService: ManagerService,
    ) {}

    // 블로그 목록 조회
    async selectBlogList(_id: string): Promise<any> {   
        console.log(_id)
        return await this.blogModel
            .find({ deletedAt: null })

    }

    // 블로그 상세 조회

    // 블로그 생성
    async createBlog(blogDto : CreateBlogDto): Promise<any> {

        const managerDto : CreateManagerDto = {
            user: blogDto.owner,
            isEditable: true,
        }
        
        const createdManager = await this.managerService.createManager(managerDto);
        
        blogDto.managers = createdManager._id;
        
        await this.blogModel.create({
            ...blogDto,
        })
    }

    // 블로그 수정

    // 블로그 삭제

}