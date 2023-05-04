import { UserEntity } from 'src/user/entities/user.entity'
import { Base } from 'src/utils/base'
import { VideoEntity } from 'src/video/entities/video.entity'
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm'

@Entity('comment')
export class CommentEntity extends Base {
	@Column({ default: '', type: 'text' })
	message: string
	@ManyToOne(() => UserEntity)
	@JoinColumn()
	user: UserEntity
	@ManyToOne(() => VideoEntity, video => video.comments)
	@JoinColumn()
	video: VideoEntity
}
