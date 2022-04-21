import { Controller, Get, UseGuards, Post, Request } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger'
import { AppService } from './app.service'
import { AuthService } from './auth/auth.service'
import { LoginUserDto } from './modules/users/dto/login-user.dto'
import { LoginResponseDto } from './modules/users/dto/login-response.dto'

@Controller()
export class AppController {
	constructor(
		private readonly appService: AppService,
		private readonly authService: AuthService
	) {}

	@Get()
	getHello(): string {
		return this.appService.getHello()
	}

	@ApiResponse({
		status: 200,
		description: 'The found record',
		type: LoginResponseDto
	})
	@UseGuards(AuthGuard('local'))
	@ApiOperation({
		summary: 'Retrieve one Access token 👻'
	})
	@Post('login')
	@ApiBody({ type: LoginUserDto })
	login(@Request() req): Promise<LoginResponseDto> {
		return this.authService.login(req.user)
	}
}
