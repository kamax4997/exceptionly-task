import { Module, CacheModule, OnModuleInit } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AuthModule } from './auth/auth.module'
import { UsersModule } from './modules/users/users.module'

import { CacheService, TypeormService } from './config'

@Module({
	imports: [
		TypeOrmModule.forRootAsync({
			useClass: TypeormService
		}),
		CacheModule.registerAsync({
			useClass: CacheService
		}),
		AuthModule,
		UsersModule
	],
	controllers: [AppController],
	providers: [AppService]
})
export class AppModule implements OnModuleInit {
	onModuleInit() {
		console.log('The module has been initialized.')
	}
}
