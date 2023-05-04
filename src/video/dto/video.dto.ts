import { IsString } from 'class-validator'

export class VideoDto {
	@IsString()
	name: string
	isPublic?: boolean
	@IsString()
	videoPath: string
	@IsString()
	thumbnailPath: string
}
