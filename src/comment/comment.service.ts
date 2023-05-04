import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { CommentEntity } from './entities/comment.entity'
import { Repository } from 'typeorm'
import { CommentDto } from './dto/comment.dto'

@Injectable()
export class CommentService {
	constructor(
		@InjectRepository(CommentEntity)
		private readonly commentRepository: Repository<CommentEntity>,
	) {}

	async create(userId: number, dto: CommentDto) {
		const newComment = this.commentRepository.create({
			message: dto.message,
			video: { id: dto.videoId },
			user: { id: userId },
		})
		return await this.commentRepository.save(newComment)
	}
}
