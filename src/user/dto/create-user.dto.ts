import { ApiProperty } from '@nestjs/swagger'

export class CreateUserDto {
  @ApiProperty({ example: 'user@email.com', description: 'Почтовый адрес пользователя' })
  readonly email: string
  @ApiProperty({ example: '123Password123', description: 'Пароль пользователя' })
  readonly password: string
}
