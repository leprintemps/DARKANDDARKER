import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { Post, PostSchema } from '../schema/post.schema';

@Module({
    //.name은 함수나 클래스등의 이름을 반환하는 읽기전용 프로퍼티 'Post'와 동일
    imports: [MongooseModule.forFeature([{ name: Post.name, schema: PostSchema }])],
    controllers: [PostController],
    providers: [PostService],
    // 외부에서 쓰고 싶으면 씀
    exports: [PostService],
})
export class PostModule {}
