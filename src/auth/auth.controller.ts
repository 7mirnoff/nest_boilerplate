import { Body, Controller, Post } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { CreateUserDto } from '../user/dto/create-user.dto'
import { AuthService } from './auth.service'

@ApiTags('Авторизация')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  async login(@Body() userDto: CreateUserDto) {
    return await this.authService.login(userDto)
  }

  @Post('/registration')
  async registration(@Body() userDto: CreateUserDto) {
    return await this.authService.registration(userDto)
  }
}
