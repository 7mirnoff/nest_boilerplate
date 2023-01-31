import { ApiProperty } from '@nestjs/swagger'

export class CreatePostDto {
  @ApiProperty({ example: 'Всем привет! Как дела?', description: 'Контент поста' })
  readonly content: string
  @ApiProperty({ example: 'Доминатор', description: 'id пользователя' })
  readonly userName: string
}
