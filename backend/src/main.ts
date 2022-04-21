import { NestFactory } from '@nestjs/core'
import { Logger, InternalServerErrorException } from '@nestjs/common'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import { MyLogger } from './config'
import { NODE_ENV, DOMAIN, PORT } from './environment'
import { AppModule } from './app.module'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const chalk = require('chalk')

declare const module: any

async function bootstrap() {
	try {
		const app = await NestFactory.create(AppModule, {
			logger: new MyLogger(),
			cors: true
		})

		// Swagger
		const config = new DocumentBuilder()
			.setTitle('Exceptionly')
			.setDescription('NestJS API for Exceptionly Frontend')
			.setVersion('1.0')
			.setExternalDoc('For more information', 'http://swagger.io')
			.addServer('/v1')
			.build()

		const document = SwaggerModule.createDocument(app, config)
		SwaggerModule.setup('api', app, document)

		app.setGlobalPrefix('/v1')

		await app.listen(PORT)

		// hot module replacement
		if (module.hot) {
			module.hot.accept()
			module.hot.dispose(() => app.close())
		}

		NODE_ENV !== 'production'
			? Logger.log(
					`🚀  Server ready at https://${DOMAIN}:${chalk
						.hex('#87e8de')
						.bold(`${PORT}`)}`,
					'Bootstrap'
			  )
			: Logger.log(
					`🚀  Server is listening on port ${chalk
						.hex('#87e8de')
						.bold(`${PORT}`)}`,
					'Bootstrap'
			  )
	} catch (error) {
		Logger.error(`❌  Error starting server, ${error}`, '', 'Bootstrap', false)
		process.exit()
		throw new InternalServerErrorException(error)
	}
}

bootstrap()
