import { Module } from '@nestjs/common'
import { PostController } from './post.controller'
import { PostService } from './post.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { PostEntity } from './post.entity'
import { UserEntity } from '../user/user.entity'
import { FilesModule } from '../files/files.module'
import { UserModule } from '../user/user.module'

@Module({
  controllers: [PostController],
  providers: [PostService],
  imports: [TypeOrmModule.forFeature([UserEntity, PostEntity]), FilesModule, UserModule],
})
export class PostModule {}
