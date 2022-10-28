import { Controller, Get, Query } from '@nestjs/common';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
    constructor(private readonly postService: PostsService) { }

    @Get()
    async getPosts() {
        return this.postService.getPosts();
    }

    @Get('/user')
    async getPostsByUser(
        @Query('email') email: string
    ) {
        return await this.postService.getPostsByUser(email);
    }



}



