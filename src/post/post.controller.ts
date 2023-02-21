import { Body, Controller, Post, Req, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common'
import { PostService } from './post.service'
import { ApiTags } from '@nestjs/swagger'
import { CreatePostDto } from './dto/create-post.dto'
import { FileInterceptor } from '@nestjs/platform-express'
import { Roles } from '../auth/roles-auth.decorator'
import { RolesGuard } from '../auth/roles.guard'

@ApiTags('Посты')
@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Roles('User')
  @UseGuards(RolesGuard)
  @Post()
  @UseInterceptors(FileInterceptor('image'))
  async createPost(@Body() dto: CreatePostDto, @UploadedFile() image, @Req() request) {
    const user = request.user
    return await this.postService.create(dto, image, user)
  }
}
