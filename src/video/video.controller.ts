import {
	Body,
	Controller,
	Get,
	Param,
	Query,
	Post,
	Put,
	Delete,
} from '@nestjs/common'
import { Auth } from 'src/decorators/auth.decorator'
import { VideoService } from './video.service'
import { VideoDto } from './dto/video.dto'
import { CurrentUser } from 'src/decorators/user.decorator'

@Controller('video')
export class VideoController {
	constructor(private readonly videoService: VideoService) {}
	@Get('get-private/:id')
	@Auth()
	async getVideoPrivate(@Param('id') id: string) {
		return this.videoService.byId(+id)
	}
	@Get()
	async getAll(@Query('searchTerm') searchTerm?: string) {
		return this.videoService.getAll(searchTerm)
	}
	@Get('most-popular')
	async getMostPopularByViews() {
		return this.videoService.getMostPopularByViews()
	}
	@Get(':id')
	async getById(@Param('id') id: string) {
		console.log(id)
		return this.videoService.byId(+id)
	}

	@Auth()
	@Put(':id')
	async updateVideo(@Param('id') id: string, @Body() dto: VideoDto) {
		return this.videoService.updateVideo(+id, dto)
	}
	@Auth()
	@Post()
	async createVideo(@CurrentUser('id') id: string) {
		return this.videoService.createVideo(+id)
	}
	@Auth()
	@Delete(':id')
	async deleteVideo(@Param('id') id: string) {
		return this.videoService.deleteVideo(+id)
	}
	@Put('update-views/:videoId')
	async updateViews(@Param('videoId') id: string) {
		return this.videoService.updateCountViews(+id)
	}
	@Put('update-likes/:videoId')
	async updateLikes(@Param('videoId') id: string) {
		return this.videoService.updateReaction(+id)
	}
}
