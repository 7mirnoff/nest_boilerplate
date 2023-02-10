import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common'
import { UserService } from './user.service'
import { CreateUserDto } from './dto/create-user.dto'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { UserEntity } from './user.entity'
import { Roles } from '../auth/roles-auth.decorator'
import { RolesGuard } from '../auth/roles.guard'
import { AddRoleDto } from './dto/add-role.dto'
import { BanUserDto } from './dto/ban-user.dto'

@ApiTags('Пользователи')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @ApiOperation({ summary: 'Создание пользователя' })
  @ApiResponse({ status: 200, type: UserEntity })
  @Post()
  async create(@Body() userDto: CreateUserDto) {
    return this.userService.createUser(userDto)
  }

  @ApiOperation({ summary: 'Получение всех пользователей' })
  @ApiResponse({ status: 200, type: [UserEntity] })
  // @UseGuards(JwtAuthGuard)
  @Roles('Admin')
  @UseGuards(RolesGuard)
  @Get('all')
  async getAll() {
    return this.userService.getAllUsers()
  }

  @ApiOperation({ summary: 'Выдать роль' })
  @ApiResponse({ status: 200 })
  @Roles('Admin')
  @UseGuards(RolesGuard)
  @Post('/role')
  async addRole(@Body() dto: AddRoleDto) {
    return this.userService.addRole(dto)
  }

  @ApiOperation({ summary: 'Бан пользователя' })
  @ApiResponse({ status: 200 })
  @Roles('Admin')
  @UseGuards(RolesGuard)
  @Post('/ban')
  async ban(@Body() dto: BanUserDto) {
    return this.userService.ban(dto)
  }
}
