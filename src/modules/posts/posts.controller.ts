import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { BodyCreatePostDto } from './dto';
import { BodyUpdatePostDto } from './dto/body-update-post.dto';
import { PostsService } from './posts.service';

@ApiTags('Posts')
@ApiBearerAuth()
@Controller('posts')
@UseGuards(AuthGuard('jwt'))
export class PostsController {
    constructor(private readonly postService: PostsService) { }

    @Get()
    @HttpCode(HttpStatus.OK)
    async getPosts() {
        return this.postService.getPosts();
    }

    @Get('/user')
    @HttpCode(HttpStatus.OK)
    async getPostsByUser(
        @Query('email') email: string
    ) {
        return await this.postService.getPostsByUser(email);
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async createPost(
        @Body() params: BodyCreatePostDto
    ) {
        return await this.postService.createPost(params);
    }

    @Patch(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async updatePost(
        @Param('id') id: number,
        @Body() params: BodyUpdatePostDto
    ) {
        return await this.postService.updatePost(id, params);
    }
    
    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async deletePost(
        @Param('id') id: number,
    ) {
        return await this.postService.deletePost(id);
    }

}



