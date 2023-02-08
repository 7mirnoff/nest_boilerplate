import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import { ApiProperty } from '@nestjs/swagger'
import { UserEntity } from '../user/user.entity'

@Entity()
export class RoleEntity extends BaseEntity {
  @ApiProperty({ example: '42', description: 'Уникальный идентификатор' })
  @PrimaryGeneratedColumn('increment')
  id: number

  @ApiProperty({ example: 'ADMIN', description: 'Значение роли прльзователя' })
  @Column({ unique: true })
  value: string

  @ApiProperty({ example: 'Администратор', description: 'Описание роли' })
  @Column()
  description: string

  @ManyToMany(() => UserEntity, (user) => user.roles, { onDelete: 'NO ACTION', onUpdate: 'NO ACTION' })
  users: UserEntity[]

  @ApiProperty({ example: '2023-01-31 22:43:43.307586+03', description: 'Дата создания роли' })
  @CreateDateColumn({ type: 'timestamp with time zone', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date

  @ApiProperty({ example: '2023-01-31 22:43:43.307586+03', description: 'Дата обновления роли' })
  @UpdateDateColumn({ type: 'timestamp with time zone', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date
}
