import { Manager, ManagerSchema } from './../../schema/manager.schema';
import { ManagerService } from './../manager/manager.service';
import { Blog, BlogSchema } from './../../schema/blog.schema';
import { Module } from "@nestjs/common";
import { BlogService } from './blog.service';
import { BlogController } from './blog.controller';
import { MongooseModule } from "@nestjs/mongoose";

@Module({
    imports:[
        MongooseModule.forFeature([{ name: Blog.name, schema: BlogSchema }]),
        MongooseModule.forFeature([{ name: Manager.name, schema: ManagerSchema }])
    ],
    controllers: [BlogController],
    providers: [BlogService, ManagerService],
    exports: [],
})
export class BlogModule {};