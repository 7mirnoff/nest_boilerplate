import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsString, Length } from 'class-validator'

export class CreateUserDto {
  @ApiProperty({ example: 'user@email.com', description: 'Почтовый адрес пользователя' })
  @IsString({ message: 'Должно быть строкой' })
  @IsEmail({}, { message: 'Не корректный email' })
  readonly email: string

  @ApiProperty({ example: '123Password123', description: 'Пароль пользователя' })
  @IsString({ message: 'Должно быть строкой' })
  @Length(4, 16, { message: 'Пароль должен быть от 4 до 16 символов' })
  readonly password: string
}
