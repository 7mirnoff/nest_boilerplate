import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import { ApiProperty } from '@nestjs/swagger'
import { UserEntity } from '../user/user.entity'

@Entity()
export class PostEntity extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number

  @Column()
  title: string

  @Column()
  content: string

  @Column()
  image: string

  @OneToMany(() => UserEntity, (author) => author.posts)
  author: UserEntity

  @ApiProperty({ example: '2023-01-31 22:43:43.307586+03', description: 'Дата создания поста' })
  @CreateDateColumn({ type: 'timestamp with time zone', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date

  @ApiProperty({ example: '2023-01-31 22:43:43.307586+03', description: 'Дата обновления поста' })
  @UpdateDateColumn({ type: 'timestamp with time zone', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date
}
