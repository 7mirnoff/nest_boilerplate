import { Body, Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common'
import { PostService } from './post.service'
import { ApiTags } from '@nestjs/swagger'
import { CreatePostDto } from './dto/create-post.dto'
import { FileInterceptor } from '@nestjs/platform-express'

@ApiTags('Посты')
@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  async createPost(@Body() dto: CreatePostDto, @UploadedFile() image) {
    console.log(dto)
    return await this.postService.create(dto, image)
  }
}
