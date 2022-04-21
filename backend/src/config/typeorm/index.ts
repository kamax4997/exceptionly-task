import { Injectable, Logger } from '@nestjs/common'
import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from '@nestjs/typeorm'
import { getMetadataArgsStorage, createConnection } from 'typeorm'

import config from '../../config.orm'

@Injectable()
export class TypeormService implements TypeOrmOptionsFactory {
	async createTypeOrmOptions(): Promise<TypeOrmModuleOptions> {
		const options = {
			...config,
			type: 'mongodb',
			entities: getMetadataArgsStorage().tables.map((tbl) => tbl.target),
			synchronize: true,
			useNewUrlParser: true,
			useUnifiedTopology: true,
			keepConnectionAlive: true,
			logging: true
		}
		createConnection(options)
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			.then((data) => {
				Logger.log(`☁️  Database connected`, 'TypeORM', false)
			})
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			.catch((err) => {
				Logger.error(`❌  Database connect error`, '', 'TypeORM', false)
			})

		return options
	}
}
