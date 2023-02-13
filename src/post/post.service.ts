import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { PostEntity } from './post.entity'
import { Repository } from 'typeorm'
import { CreatePostDto } from './dto/create-post.dto'
import { FilesService } from '../files/files.service'
import { UserService } from '../user/user.service'

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(PostEntity) private readonly postRepository: Repository<PostEntity>,
    private readonly filesService: FilesService,
    private readonly userService: UserService,
  ) {}

  async create(dto: CreatePostDto, image) {
    // FIXME!!! 13.
    const fileName = await this.filesService.createFile(image)
    const user = await this.userService.getUserById(2)
    console.log(user)
    if (!user) {
      throw new HttpException('Пользователь не найден', HttpStatus.NOT_FOUND)
    }

    const postEntity = this.postRepository.create({ ...dto, image: fileName, author: user })

    const post = await this.postRepository.save(postEntity)
    return post
  }
}
