import { CommentEntity } from 'src/comment/entities/comment.entity'
import { UserEntity } from 'src/user/entities/user.entity'
import { Base } from 'src/utils/base'
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm'

@Entity('video')
export class VideoEntity extends Base {
	@Column({ default: false })
	isPublic: boolean
	@Column({ default: 0 })
	likes?: number
	@Column({ default: 0 })
	views?: number
	@Column({ default: 0 })
	duration?: number
	@Column({ default: '' })
	videoPath: string
	@Column()
	name: string
	@Column({ default: '' })
	thumbnailPath: string
	@ManyToOne(() => UserEntity, user => user.videos)
	@JoinColumn()
	user: UserEntity
	@OneToMany(() => CommentEntity, com => com.video)
	@JoinColumn()
	comments: CommentEntity[]
}
