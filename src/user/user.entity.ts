import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import { ApiProperty } from '@nestjs/swagger'

@Entity()
export class UserEntity extends BaseEntity {
  @ApiProperty({ example: '1', description: 'Уникальный идентификатор' })
  @PrimaryGeneratedColumn('increment')
  id: number

  @ApiProperty({ example: 'user@gmail.com', description: 'Почтовый адрес' })
  @Column({ unique: true })
  email: string

  @ApiProperty({ example: '123User123!', description: 'Пароль пользователя' })
  @Column()
  password: string

  // FIXME: вынести в отдельную таблицу забаненных пользователей
  @ApiProperty({ example: 'true', description: 'Забанен пользователь или нет' })
  @Column({ type: 'boolean', default: false })
  banned: boolean

  // FIXME: вынести в отдельную таблицу забаненных пользователей
  @ApiProperty({ example: 'Оскорблял других пользователей в чате', description: 'Причина бана' })
  @Column({ type: 'text', nullable: true })
  banReason: string

  @ApiProperty({ example: '2023-01-31 22:43:43.307586+03', description: 'Дата создания пользователя' })
  @CreateDateColumn({ type: 'timestamp with time zone', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date

  @ApiProperty({ example: '2023-01-31 22:43:43.307586+03', description: 'Дата обновления пользователя' })
  @UpdateDateColumn({ type: 'timestamp with time zone', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date
}
