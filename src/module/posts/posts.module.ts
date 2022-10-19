import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './post.controller';

@Module({
  imports: [],
  controllers: [PostsController],
  providers: [PostsService],
})
export class PostsModule {}
