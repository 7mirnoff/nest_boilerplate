import { BaseEntity, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm'
import { RoleEntity } from '../role/role.entity'
import { UserEntity } from '../user/user.entity'

@Entity()
export class UserRolesEntity extends BaseEntity {
  @PrimaryColumn({ name: 'user_id' })
  userId: number

  @PrimaryColumn({ name: 'role_id' })
  roleId: number

  @ManyToOne(() => UserEntity, (user) => user.roles, { onDelete: 'NO ACTION', onUpdate: 'NO ACTION' })
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
  users: UserEntity[]

  @ManyToOne(() => RoleEntity, (role) => role.users, { onDelete: 'NO ACTION', onUpdate: 'NO ACTION' })
  @JoinColumn([{ name: 'role_id', referencedColumnName: 'id' }])
  roles: RoleEntity[]
}
