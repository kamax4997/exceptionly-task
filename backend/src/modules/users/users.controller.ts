import {
	Controller,
	UseGuards,
	Post,
	Get,
	Param,
	ClassSerializerInterceptor,
	UseInterceptors,
	Body
} from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import {
	ApiBearerAuth,
	ApiTags,
	ApiOperation,
	ApiResponse
} from '@nestjs/swagger'

import { UserEntity } from './user.entity'
import { RegisterUserDto } from './dto/register-user.dto'
import { RegisterResponseDto } from './dto/register-response.dto'
import { UsersService } from './users.service'
import { ErrorResponseDto } from './dto/error-response.dto'
import { AuthService } from '../../auth/auth.service'

@ApiResponse({
	status: 401,
	description: 'Unauthorized.',
	type: ErrorResponseDto
})
@ApiResponse({ status: 403, description: 'Forbidden.', type: ErrorResponseDto })
@UseInterceptors(ClassSerializerInterceptor)
@ApiTags('users')
@Controller('users')
export class UsersController {
	constructor(
		private readonly authService: AuthService,
		private readonly userService: UsersService
	) {}

	@ApiResponse({
		status: 200,
		description: 'The found records',
		type: [UserEntity]
	})
	@ApiBearerAuth()
	@UseGuards(AuthGuard('jwt'))
	@ApiOperation({
		summary: 'Retrieve many Users 👻'
	})
	@Get()
	findAll() {
		return this.userService.findAll()
	}

	@ApiResponse({
		status: 200,
		description: 'The found record',
		type: RegisterResponseDto
	})
	@ApiOperation({
		summary: 'Register one User 👻'
	})
	@Post()
	async insert(@Body() registerUserDto: RegisterUserDto) {
		const RegisterResponseDto = await this.userService.insert(registerUserDto)

		return RegisterResponseDto
	}

	@ApiResponse({
		status: 200,
		description: 'The found record',
		type: UserEntity
	})
	@ApiBearerAuth()
	@UseGuards(AuthGuard('jwt'))
	@ApiOperation({
		summary: 'Retrieve one User 👻'
	})
	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.userService.findOne(id)
	}
}
