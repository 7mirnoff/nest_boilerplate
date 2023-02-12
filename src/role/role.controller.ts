import { Body, Controller, Get, Param, Post } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { RoleService } from './role.service'
import { CreateRoleDto } from './dto/create-role.dto'

@ApiTags('Роли')
@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post()
  async create(@Body() dto: CreateRoleDto) {
    return await this.roleService.createRole(dto)
  }

  @Get(':value')
  async getRoleByValue(@Param('value') value: string) {
    return await this.roleService.getRoleByValue(value)
  }
}
