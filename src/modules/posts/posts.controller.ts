import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { BodyCreatePostDto } from './dto';
import { BodyUpdatePostDto } from './dto/body-update-post.dto';
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

    @Patch(':id')
    async updatePost(
        @Param('id') id: number,
        @Body() params: BodyUpdatePostDto
    ) {
        return await this.postService.updatePost(id, params);
    }
    
    @Delete(':id')
    async deletePost(
        @Param('id') id: number,
    ) {
        return await this.postService.deletePost(id);
    }

}



