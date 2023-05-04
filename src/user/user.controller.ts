import {
	Body,
	Controller,
	Get,
	Param,
	Patch,
	Put,
	UsePipes,
	ValidationPipe,
} from '@nestjs/common'
import { UserService } from './user.service'
import { Auth } from 'src/decorators/auth.decorator'
import { CurrentUser } from 'src/decorators/user.decorator'
import { UserDto } from './dto/user.dto'

@Controller('user')
export class UserController {
	constructor(private readonly userService: UserService) {}
	@Get('profile')
	@Auth()
	async getProfile(@CurrentUser('id') id: number) {
		return this.userService.byId(id)
	}
	@Get('by-id/:id')
	@Auth()
	async getUser(@Param('id') id: string) {
		return this.userService.byId(+id)
	}
	@UsePipes(new ValidationPipe())
	@Put(':id')
	@Auth()
	async updateUser(@Param('id') id: string, @Body() dto: UserDto) {
		return this.userService.updateProfile(+id, dto)
	}
	@UsePipes(new ValidationPipe())
	@Patch('subscribe/:channelId')
	@Auth()
	async subscribeToChannel(
		@CurrentUser('id') id: number,
		@Param('channelId') channelId: string,
	) {
		return this.userService.subscribe(id, +channelId)
	}
	@Get()
	async getUsers() {
		return this.userService.getAll()
	}
}
