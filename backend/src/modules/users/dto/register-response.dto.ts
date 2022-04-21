import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty } from 'class-validator'
import { UserEntity } from '../user.entity'

export class RegisterResponseDto {
	@ApiProperty({
		example: UserEntity,
		description: 'The user of the RegisterResponse'
	})
	@IsNotEmpty()
	readonly user: UserEntity
}
