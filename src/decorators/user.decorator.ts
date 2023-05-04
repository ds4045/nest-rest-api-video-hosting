import { ExecutionContext, createParamDecorator } from '@nestjs/common'
import { UserEntity } from 'src/user/entities/user.entity'

export const CurrentUser = createParamDecorator(
	(data: keyof UserEntity, ctx: ExecutionContext) => {
		const request = ctx.switchToHttp().getRequest()
		const user = request.user
		return data ? user[data] : user
	},
)
