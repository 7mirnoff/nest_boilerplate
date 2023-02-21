import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { PostEntity } from './post.entity'
import { Repository } from 'typeorm'
import { CreatePostDto } from './dto/create-post.dto'
import { FilesService } from '../files/files.service'

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(PostEntity) private readonly postRepository: Repository<PostEntity>,
    private readonly filesService: FilesService,
  ) {}

  async create(dto: CreatePostDto, image, user) {
    const fileName = await this.filesService.createFile(image)

    const postEntity = this.postRepository.create({ ...dto, image: fileName, author: user })

    const post = await this.postRepository.save(postEntity)
    return post
  }
}
