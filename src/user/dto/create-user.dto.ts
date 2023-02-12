import { ApiProperty } from '@nestjs/swagger'
import { IsString } from 'class-validator'

export class CreateUserDto {
  @ApiProperty({ example: 'user@email.com', description: 'Почтовый адрес пользователя' })
  @IsString({ message: 'Должно быть строкой' })
  readonly email: string

  @ApiProperty({ example: '123Password123', description: 'Пароль пользователя' })
  readonly password: string
}
