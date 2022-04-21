import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsEmail, Length } from 'class-validator'

export class RegisterUserDto {
	@ApiProperty({
		example: 'Andrei',
		description: 'The first name of the User'
	})
	@Length(5, 20)
	@IsNotEmpty()
	readonly firstName: string

	@ApiProperty({
		example: 'Strukau',
		description: 'The last name of the User'
	})
	@Length(5, 20)
	@IsNotEmpty()
	readonly lastName: string

	@ApiProperty({
		example: 'karlikboroda@gmail.com',
		description: 'The email of the User'
	})
	@IsEmail()
	@IsNotEmpty()
	readonly email: string

	@ApiProperty({
		example: 'ai7bjs7*&2',
		description: 'The password of the User'
	})
	@IsNotEmpty()
	readonly password: string
}
