import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { RoleService } from './role.service'
import { RoleEntity } from './role.entity'
import { RoleController } from './role.controller'
import { UserEntity } from '../user/user.entity'

@Module({
  controllers: [RoleController],
  providers: [RoleService],
  imports: [TypeOrmModule.forFeature([RoleEntity, UserEntity])],
})
export class RoleModule {}
