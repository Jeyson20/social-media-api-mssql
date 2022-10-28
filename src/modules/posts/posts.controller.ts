import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { BodyCreatePostDto } from './dto';
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

    @Post()
    async createPost(
        @Body() params: BodyCreatePostDto
    ) {
        return await this.postService.createPost(params);
    }




}



