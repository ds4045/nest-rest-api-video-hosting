import { ConfigService } from '@nestjs/config'
import { TypeOrmModuleOptions } from '@nestjs/typeorm'

export const getTypeOrmConfig = async (
	configService: ConfigService,
): Promise<TypeOrmModuleOptions> => ({
	type: 'postgres',
	host: configService.get('HOST'),
	port: configService.get('PORT'),
	database: configService.get('DATABASE'),
	password: configService.get('PASSWORD'),
	username: configService.get('USERNAME'),
	autoLoadEntities: true,
	synchronize: true,
})
