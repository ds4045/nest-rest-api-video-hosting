import {
	Controller,
	Post,
	Body,
	UsePipes,
	ValidationPipe,
} from '@nestjs/common'
import { CommentService } from './comment.service'
import { CommentDto } from './dto/comment.dto'
import { Auth } from 'src/decorators/auth.decorator'
import { CurrentUser } from 'src/decorators/user.decorator'

@Controller('comment')
export class CommentController {
	constructor(private readonly commentService: CommentService) {}
	@UsePipes(new ValidationPipe())
	@Post()
	@Auth()
	async createComment(@CurrentUser('id') id: string, @Body() dto: CommentDto) {
		return this.commentService.create(+id, dto)
	}
}
