import { Module } from '@nestjs/common'
import { UserController } from './user.controller'
import { UserService } from './user.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserEntity } from './user.entity'
import { RoleEntity } from '../role/role.entity'
import { RoleModule } from '../role/role.module'
import { UserRolesEntity } from '../user-roles/user-roles.entity'

@Module({
  controllers: [UserController],
  providers: [UserService],
  imports: [TypeOrmModule.forFeature([UserEntity, RoleEntity, UserRolesEntity]), RoleModule],
  exports: [UserService],
})
export class UserModule {}
