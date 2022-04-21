import {
	Injectable,
	ForbiddenException,
	NotFoundException
} from '@nestjs/common'
import { RegisterUserDto } from './dto/register-user.dto'
import { getMongoRepository } from 'typeorm'

import { UserEntity } from './user.entity'
import { hashPassword } from '../../utils'

export type User = any

@Injectable()
export class UsersService {
	async insert(registerUserDto: RegisterUserDto): Promise<User | undefined> {
		const { email, firstName, lastName, password } = registerUserDto

		const existedUser = await getMongoRepository(UserEntity).findOne({
			where: {
				email
			}
		})

		if (existedUser) {
			throw new ForbiddenException('Email already existed.')
		}

		const newUser = await getMongoRepository(UserEntity).save(
			new UserEntity({
				firstName,
				lastName,
				email,
				password: await hashPassword(password)
			})
		)

		return { user: newUser }
	}

	async findAll(): Promise<User[] | undefined> {
		return getMongoRepository(UserEntity).find()
	}

	async findOne(_id: string): Promise<User | undefined> {
		const foundUser = await getMongoRepository(UserEntity).findOne({
			where: { _id }
		})

		if (!foundUser) {
			throw new NotFoundException('User not found.')
		}

		return foundUser
	}

	async findOneWithEmail(email: string): Promise<User | undefined> {
		const foundUser = await getMongoRepository(UserEntity).findOne({
			where: {
				email
			}
		})

		if (!foundUser) {
			throw new NotFoundException('User not found.')
		}

		return foundUser
	}
}
