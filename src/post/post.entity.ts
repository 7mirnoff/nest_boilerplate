import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class PostEntity {
  @PrimaryGeneratedColumn('increment')
  id: number

  @Column({ type: 'text' })
  content: string

  @Column()
  userName: string
}
