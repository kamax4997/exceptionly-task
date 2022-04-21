import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsEmail } from 'class-validator'

export class LoginUserDto {
	@ApiProperty({
		default: 'karlikboroda@gmail.com',
		example: 'karlikboroda@gmail.com',
		description: 'The email of the User'
	})
	@IsEmail()
	@IsNotEmpty()
	readonly email: string

	@ApiProperty({
		default: '0',
		example: '0',
		description: 'The password of the User'
	})
	@IsNotEmpty()
	readonly password: string
}
