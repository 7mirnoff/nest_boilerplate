import { ApiProperty } from '@nestjs/swagger'

export class AddRoleDto {
  @ApiProperty({ example: 'Admin', description: 'Значение роли' })
  readonly value: string
  @ApiProperty({ example: '2', description: 'ID пользователя которому добавляется роль' })
  readonly userId: number
}
