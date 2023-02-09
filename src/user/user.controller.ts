import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common'
import { UserService } from './user.service'
import { CreateUserDto } from './dto/create-user.dto'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { UserEntity } from './user.entity'
import { Roles } from '../auth/roles-auth.decorator'
import { RolesGuard } from '../auth/roles.guard'

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
}
