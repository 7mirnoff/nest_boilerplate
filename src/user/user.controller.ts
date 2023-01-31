import { Body, Controller, Get, Post } from '@nestjs/common'
import { UserService } from './user.service'
import { CreateUserDto } from './dto/create-user.dto'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { UserEntity } from './user.entity'

@ApiTags('Пользователи')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {
  }

  @ApiOperation({ summary: 'Создание пользователя' })
  @ApiResponse({ status: 200, type: UserEntity })
  @Post()
  async create(@Body() userDto: CreateUserDto) {
    return this.userService.createUser(userDto)
  }

  @ApiOperation({ summary: 'Получение всех пользователей' })
  @ApiResponse({ status: 200, type: [UserEntity] })
  @Get('all')
  async getAll() {
    return this.userService.getAllUsers()
  }
}
