import { Base } from 'src/utils/base'
import { VideoEntity } from 'src/video/entities/video.entity'
import { Column, Entity, JoinColumn, OneToMany } from 'typeorm'
import { SubscriptionsEntity } from './subscriptions.entity'

@Entity('user')
export class UserEntity extends Base {
	@Column({ unique: true })
	email: string
	@Column({ select: false })
	password: string
	@Column({ default: '' })
	name: string
	@Column({ default: false })
	isVerified: boolean
	@Column({ default: 0 })
	subscribersCount: number
	@Column({ default: '', type: 'text' })
	description: string
	@Column({ default: '' })
	avatarPath: string
	@OneToMany(() => VideoEntity, video => video.user)
	@JoinColumn()
	videos: VideoEntity[]
	@OneToMany(() => SubscriptionsEntity, sub => sub.fromUser)
	@JoinColumn()
	subscriptions: SubscriptionsEntity[]
	@OneToMany(() => SubscriptionsEntity, sub => sub.toChannel)
	@JoinColumn()
	subscribers: SubscriptionsEntity[]
}
