import { Base } from 'src/utils/base'
import { Entity, JoinColumn, ManyToOne } from 'typeorm'
import { UserEntity } from './user.entity'

@Entity('subscriptions')
export class SubscriptionsEntity extends Base {
	@ManyToOne(() => UserEntity, user => user.subscriptions)
	@JoinColumn()
	fromUser: UserEntity
	@ManyToOne(() => UserEntity, user => user.subscribers)
	@JoinColumn()
	toChannel: UserEntity
}
