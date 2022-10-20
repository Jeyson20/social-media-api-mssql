import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
<<<<<<< HEAD
import { PostsModule } from './modules/posts/posts.module';
import { UsersModule } from './modules/users/users.module';
=======
import { PostsModule } from './module/posts/posts.module';
import { UsersModule } from './module/users/users.module';
import { CommentService } from './module/comment/comment.service';
import { CommentController } from './module/comment/comment.controller';
import { CommentModule } from './module/comment/comment.module';
>>>>>>> cfdacaf7ee9d4eb84e2167940269c9ce50a3a3de

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    UsersModule,
    PostsModule,
<<<<<<< HEAD
  ],

=======
    CommentModule,
  ],
  providers: [CommentService],
  controllers: [CommentController],
>>>>>>> cfdacaf7ee9d4eb84e2167940269c9ce50a3a3de
})
export class AppModule {
  static port: number;
  constructor(private readonly configService: ConfigService) {
    AppModule.port = +this.configService.get('PORT');
  }
}
