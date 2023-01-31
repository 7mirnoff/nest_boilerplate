import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common'
import { CreatePostDto } from './dto/create-post.dto'
import { UpdatePostDto } from './dto/update-post.dto'
import { PostService } from './post.service'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { PostEntity } from './post.entity'

@ApiTags('Посты')
@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @ApiOperation({ summary: 'Получение всех постов' })
  @ApiResponse({ status: 200, type: [PostEntity] })
  @Get('all')
  async getAll() {
    return this.postService.getAll()
  }

  @ApiOperation({ summary: 'Создание поста' })
  @ApiResponse({ status: 200, type: PostEntity })
  @Post()
  async create(@Body() dto: CreatePostDto) {
    return this.postService.create(dto)
  }

  @Get(':id')
  async getById(@Param('id') id: string) {
    return this.postService.getById(id)
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() dto: UpdatePostDto) {
    return this.postService.update(id, dto)
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.postService.delete(id)
  }
}
