import { Injectable, UnauthorizedException } from '@nestjs/common'
import { CreatePostDto } from './dto/create-post.dto'
import { UpdatePostDto } from './dto/update-post.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { PostEntity } from './post.entity'
import { Repository } from 'typeorm'

@Injectable()
export class PostService {
  constructor(@InjectRepository(PostEntity) private readonly postRepository: Repository<PostEntity>) {}

  async getAll() {
    return await this.postRepository.find()
  }

  async create(dto: CreatePostDto) {
    const post = this.postRepository.create(dto)
    return await this.postRepository.save(post)
  }

  async getById(id: string) {
    return await this.postRepository.findOne({
      where: {
        id: Number(id),
      },
    })
  }

  async update(id: string, dto: UpdatePostDto) {
    const post = await this.getById(id)

    if (!post) {
      throw new UnauthorizedException({ message: 'Пост не найден' })
    }

    post.content = dto.content
    post.userName = dto.userName
    return await this.postRepository.save(post)
  }

  async delete(id: string) {
    return await this.postRepository.delete({ id: Number(id) })
  }
}
