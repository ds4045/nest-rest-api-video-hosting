import {
	BadRequestException,
	Injectable,
	NotFoundException,
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { UserEntity } from './entities/user.entity'
import { Repository } from 'typeorm'
import { SubscriptionsEntity } from './entities/subscriptions.entity'
import { UserDto } from './dto/user.dto'
import { genSalt, hash } from 'bcryptjs'

@Injectable()
export class UserService {
	constructor(
		@InjectRepository(UserEntity)
		private readonly userRepository: Repository<UserEntity>,
		@InjectRepository(SubscriptionsEntity)
		private readonly subscriptionRepository: Repository<SubscriptionsEntity>,
	) {}
	async getAll() {
		return this.userRepository.find()
	}
	async subscribe(id: number, channelId: number) {
		const data = { toChannel: { id: channelId }, fromUser: { id } }
		console.log(data)
		const isSubscribed = await this.subscriptionRepository.findOneBy(data)
		console.log(isSubscribed)
		if (!isSubscribed) {
			const newSubscription = await this.subscriptionRepository.create(data)
			console.log(newSubscription)
			await this.subscriptionRepository.save(newSubscription)
			return true
		}

		await this.subscriptionRepository.delete(data)
		return false
	}
	async updateProfile(userId: number, dto: UserDto) {
		const user = await this.byId(userId)
		const isSameUser = await this.userRepository.findOneBy({ email: dto.email })
		if (isSameUser && userId !== isSameUser.id)
			throw new BadRequestException('Email занят')
		if (dto.password) {
			const salt = await genSalt(10)
			user.password = await hash(dto.password, salt)
		}
		user.email = dto.email
		user.name = dto.name
		user.description = dto.description
		user.avatarPath = dto.avatarPath
		return await this.userRepository.save(user)
	}
	async byId(id: number) {
		const user = await this.userRepository.findOne({
			where: { id },
			select: {
				videos: true,
				subscriptions: true,
			},
			order: {
				createdAt: 'DESC',
			},
		})
		if (!user) throw new NotFoundException('Пользователь не найден')
		return user
	}
}
