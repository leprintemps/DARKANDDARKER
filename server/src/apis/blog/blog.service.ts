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
        return await this.blogModel
            .find({ deletedAt: null })
            .populate({ path: "manages", match: { user: _id } });
    }

    // 블로그 상세 조회
    async selectBlogDetail(_id: string): Promise<any> {
        const blog = await this.blogModel.findOne({ _id })
            .populate({ path: "manages" });

        if ( !blog ) {
            throw new HttpException("No contents.", HttpStatus.NO_CONTENT);
        }

        return blog;
    }

    // 블로그 생성
    async createBlog(blogDto : CreateBlogDto): Promise<any> {
        const createdBlog = await this.blogModel.create({
            ...blogDto,
        })

        const managerDto: CreateManagerDto = {
            user: createdBlog.owner,
            isEditable: true,
            createdAt: new Date(),
            updatedAt: new Date(),
            deletedAt: new Date(),
        }
        
        this.managerService.createManager(managerDto);

        return createdBlog;
    }

    // 블로그 수정
    async updateBlog(blogDto : UpdateBlogDto): Promise<any> {
        const { _id } = blogDto;
        const isExists = await this.blogModel.exists({ _id });
        
        if ( !isExists ) {
            throw new HttpException("No contents.", HttpStatus.NO_CONTENT);
        }

        return await this.blogModel.findByIdAndUpdate(_id, blogDto);
    }

    // 블로그 삭제
    async removeBlog(_id : string): Promise<any> {
        const isExists = await this.blogModel.exists({ _id });

        if ( !isExists ) {
            throw new HttpException("No contents", HttpStatus.NO_CONTENT);
        }

        await this.blogModel.findByIdAndUpdate(_id, { deleteAt: new Date() });
    }

}