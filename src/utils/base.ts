import { CreateDateColumn, PrimaryGeneratedColumn } from 'typeorm'

export abstract class Base {
	@PrimaryGeneratedColumn()
	id: number
	@CreateDateColumn()
	createdAt: Date
	@CreateDateColumn()
	updatedAt: Date
}
