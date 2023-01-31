import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { UserEntity } from './user.entity'
import { CreateUserDto } from './dto/create-user.dto'

@Injectable()
export class UserService {
  constructor(@InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>) {
  }

  async createUser(dto: CreateUserDto) {
    const user = await this.userRepository.create(dto)
    return this.userRepository.save(user)
  }

  async getAllUsers() {
    return this.userRepository.find()
  }
}
