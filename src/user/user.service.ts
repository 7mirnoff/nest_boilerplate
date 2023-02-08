import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { UserEntity } from './user.entity'
import { CreateUserDto } from './dto/create-user.dto'
import { RoleService } from '../role/role.service'
import { UserRolesEntity } from '../user-roles/user-roles.entity'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(UserRolesEntity) private readonly userRolesRepository: Repository<UserRolesEntity>,
    private readonly roleService: RoleService,
  ) {}

  async createUser(dto: CreateUserDto) {
    const userEntity = await this.userRepository.create(dto)
    const role = await this.roleService.getRoleByValue('User')
    const user = await this.userRepository.save(userEntity)

    await this.userRolesRepository.save({ userId: user.id, roleId: role.id })
    return user
  }

  async getAllUsers() {
    return this.userRepository.find({
      relations: {
        roles: true,
      },
    })
  }
}
