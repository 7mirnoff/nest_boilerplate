import { Injectable } from '@nestjs/common'
import { CreateRoleDto } from './dto/create-role.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { RoleEntity } from './role.entity'

@Injectable()
export class RoleService {
  constructor(@InjectRepository(RoleEntity) private readonly roleRepository: Repository<RoleEntity>) {}

  async createRole(dto: CreateRoleDto) {
    const user = await this.roleRepository.create(dto)
    return this.roleRepository.save(user)
  }

  async getRoleByValue(value: string) {
    return this.roleRepository.findOne({
      where: {
        value: value,
      },
      relations: {
        users: true,
      },
    })
  }
}
