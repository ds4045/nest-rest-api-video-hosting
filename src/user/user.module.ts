import { Module } from '@nestjs/common'
import { UserService } from './user.service'
import { UserController } from './user.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserEntity } from './entities/user.entity'
import { SubscriptionsEntity } from './entities/subscriptions.entity'

@Module({
	imports: [TypeOrmModule.forFeature([UserEntity, SubscriptionsEntity])],
	controllers: [UserController],
	providers: [UserService],
	exports: [UserService],
})
export class UserModule {}
