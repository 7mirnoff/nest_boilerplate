import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { UserEntity } from './user.entity'
import { CreateUserDto } from './dto/create-user.dto'
import { RoleService } from '../role/role.service'
import { UserRolesEntity } from '../user-roles/user-roles.entity'
import { AddRoleDto } from './dto/add-role.dto'
import { BanUserDto } from './dto/ban-user.dto'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(UserRolesEntity) private readonly userRolesRepository: Repository<UserRolesEntity>,
    private readonly roleService: RoleService,
  ) {}

  async createUser(dto: CreateUserDto) {
    const userEntity = this.userRepository.create(dto)
    const role = await this.roleService.getRoleByValue('User')

    if (!role) {
      throw new UnauthorizedException({ message: 'Роль не найдена' })
    }

    const user = await this.userRepository.save(userEntity)
    await this.userRolesRepository.save({ userId: user.id, roleId: role.id })

    user.roles = [role]
    return user
  }

  async getAllUsers() {
    return await this.userRepository.find({
      relations: {
        roles: true,
      },
    })
  }

  async getUserByEmail(email: string) {
    const user = await this.userRepository.findOne({
      where: {
        email: email,
      },
      relations: {
        roles: true,
      },
    })

    return user
  }

  async getUserById(id: number) {
    const user = await this.userRepository.findOne({
      where: {
        id: id,
      },
      relations: {
        roles: true,
      },
    })

    return user
  }

  async addRole(dto: AddRoleDto) {
    const user = await this.userRepository.findOneBy({
      id: dto.userId,
    })

    const role = await this.roleService.getRoleByValue(dto.value)

    if (role && user) {
      await this.userRolesRepository.save({ userId: user.id, roleId: role.id })
      return dto
    }

    throw new HttpException('Пользователь или роль не найдены', HttpStatus.NOT_FOUND)
  }

  async ban(dto: BanUserDto) {
    const user = await this.userRepository.findOneBy({
      id: dto.userId,
    })

    if (!user) {
      throw new HttpException('Пользователь не найден', HttpStatus.NOT_FOUND)
    }

    user.banned = true
    user.banReason = dto.banReason
    return await this.userRepository.save(user)
  }
}
