import { ApiProperty } from '@nestjs/swagger'

export class BanUserDto {
  @ApiProperty({ example: '2', description: 'ID пользователя которого баним' })
  readonly userId: number
  @ApiProperty({ example: 'Оскорбление других прользователей', description: 'Причина бана' })
  readonly banReason: string
}
