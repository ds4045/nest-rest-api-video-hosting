import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'
import { JwtStrategy } from './strategies/jwt.strategies'
import { JwtModule } from '@nestjs/jwt'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { getJwnConfig } from 'src/config/jwt.config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserEntity } from 'src/user/entities/user.entity'

@Module({
	controllers: [AuthController],
	providers: [AuthService, JwtStrategy, ConfigService],
	imports: [
		JwtModule.registerAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: getJwnConfig,
		}),
		TypeOrmModule.forFeature([UserEntity]),
	],
})
export class AuthModule {}
